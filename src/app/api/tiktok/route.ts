import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') res.status(405).send(`Cannot ${req.method} ${req.url}`);

  if (Object.keys(req.query)[0] !== 'aweme_id' && Object.keys(req.query)[0] !== 'mobile') res.status(400).send(`Invalid request: Missing or invalid query ${Object.keys(req.query)[0]}.`);

  let firstQueryParam: string = Object.values(req.query)[0] as string;

  if (/^(?!https?:\/\/)(vm|vt)\.tiktok\.com\/.*$/.test(firstQueryParam)) firstQueryParam = 'https://' + firstQueryParam;

  if (Object.keys(req.query)[0] === 'aweme_id' && /^[0-9]{19}$/.test(firstQueryParam)) {
    const response = await axios
      .get(
        `https://api22-normal-c-alisg.tiktokv.com/aweme/v1/feed/?iid=7318518857994389254&device_id=7318517321748022790&channel=googleplay&app_name=musical_ly&version_code=300904&device_platform=android&device_type=ASUS_Z01QD&os_version=9&aweme_id=${firstQueryParam}`,
        {
          headers: {
            'User-Agent': 'TikTok 26.2.0 rv:262018 (iPhone; iOS 14.4.2; en_US) Cronet',
          },
        }
      )
      .catch(() => {
        res.status(400).send(`Invalid request: Missing or invalid query parameter ${firstQueryParam}.`);
      });

    let resObject: { [key: string]: any } = {};

    if (response) {
      if (response.data.aweme_list[0].image_post_info) {
        resObject['image'] = true;

        resObject.images = [];

        for (let i = 0; i < response.data.aweme_list[0].image_post_info.images.length; i++) {
          resObject.images.push(response.data.aweme_list[0].image_post_info.images[i].display_image.url_list[1]);
        }

        resObject['sound'] = response.data.aweme_list[0].music.play_url.url_list[0];
        resObject['author'] = response.data.aweme_list[0].author.unique_id;
      } else {
        resObject['video'] = true;

        resObject['video0'] = response.data.aweme_list[0].video.play_addr.url_list[0];
        resObject['video1'] = response.data.aweme_list[0].video.download_addr.url_list[0];

        resObject['sound'] = response.data.aweme_list[0].music.play_url.url_list[0];
        resObject['author'] = response.data.aweme_list[0].author.unique_id;
      }

      res.status(200).json(resObject);
    } else {
      res.status(400).send(`Invalid request: Missing or invalid query parameter ${firstQueryParam}.`);
    }
  } else if (Object.keys(req.query)[0] === 'mobile' && /^(https?:\/\/)?(vm|vt)\.tiktok\.com\/.*$/.test(firstQueryParam)) {
    const response = await axios.get(firstQueryParam, { maxRedirects: 0, validateStatus: (status) => status >= 200 && status < 400 }).catch(() => {
      res.status(400).send(`Invalid request: Missing or invalid query parameter ${firstQueryParam}.`);
    });

    if (response) {
      const id = response.headers.location.match(/\b\d{19}\b/)[0];

      const resp = await axios.get(
        `https://api22-normal-c-alisg.tiktokv.com/aweme/v1/feed/?iid=7318518857994389254&device_id=7318517321748022790&channel=googleplay&app_name=musical_ly&version_code=300904&device_platform=android&device_type=ASUS_Z01QD&os_version=9&aweme_id=${id}`,
        {
          headers: {
            'User-Agent': 'TikTok 26.2.0 rv:262018 (iPhone; iOS 14.4.2; en_US) Cronet',
          },
        }
      );

      let resObject: { [key: string]: any } = {};

      if (resp) {
        if (resp.data.aweme_list[0].image_post_info) {
          resObject['image'] = true;

          resObject.images = [];

          for (let i = 0; i < resp.data.aweme_list[0].image_post_info.images.length; i++) {
            resObject.images.push(resp.data.aweme_list[0].image_post_info.images[i].display_image.url_list[1]);
          }

          resObject['sound'] = resp.data.aweme_list[0].music.play_url.url_list[0];
          resObject['author'] = resp.data.aweme_list[0].author.unique_id;
        } else {
          resObject['video'] = true;

          resObject['video0'] = resp.data.aweme_list[0].video.play_addr.url_list[0];
          resObject['video1'] = resp.data.aweme_list[0].video.download_addr.url_list[0];

          resObject['sound'] = resp.data.aweme_list[0].music.play_url.url_list[0];
          resObject['author'] = resp.data.aweme_list[0].author.unique_id;
        }
        res.status(200).json(resObject);
      } else {
        res.status(400).send(`Invalid request: Missing or invalid query parameter ${firstQueryParam}.`);
      }
    } else {
      res.status(400).send(`Invalid request: Missing or invalid query parameter ${firstQueryParam}.`);
    }
  } else {
    res.status(400).send(`Invalid request: Missing or invalid query parameter ${firstQueryParam}.`);
  }
}
