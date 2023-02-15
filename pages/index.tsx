import { Box, Button, Center, Input } from '@chakra-ui/react';
import { Chat24Filled as ChatIcon } from "@fluentui/react-icons";
import { Octokit } from '@octokit/core';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { AutoCenter } from '../components/AutoCenter';
import { CustomBadge, Presets } from '../components/Common';
import { Image } from '../components/Image';
import { Menu } from '../components/Menu';
import { Meta } from '../components/Meta';
import { ButtonStyle } from '../components/Theme';
import { IndexProps, OctoFile } from '../utils/parse-user';
import { Configuration } from './_app';

export default function Home(props: IndexProps) {
  const Search = useRef("");
  const SetSearch = (newValue: string) => Search.current = newValue;
  const RenderIcons = () => props.icons.filter(e => {
    if (Search.current != null && Search.current != "") return e.name.includes(Search.current);
    else return true;
  }).map(e => (
    <Box key={e.raw.sha}>
      <Image src={e.url} width={50} />
    </Box>
  ));
  const [RenderedIcons, setRenderedIcons] = useState(RenderIcons());

  useEffect(() => {
    setRenderedIcons(RenderIcons());
  }, [Search.current])

  return (
    <div className='pb-10 pt-10'>
      <Menu {...props} hideName />
      <Meta>Home</Meta>
      <AutoCenter>
        <div className='text-center'>
          <CustomBadge preset={Presets.ComingSoon("!px-4 py-1", "Public Beta")} />
          <Center>
            <h1 className='font-bold text-4xl pt-5 pb-1'>
              {/* <img src={Configuration.Icon.SVG} className="w-8 inline-block mb-2 mr-2" /> */}
              {Configuration.TagLine}
            </h1>
          </Center>
          <Center>
            <p className='max-w-3xl pt-1 font-medium text-light text-lg'>{Configuration.Description}</p>
          </Center>
          <Center className='mt-5'>
            <Link href='/discord'>
              <Button variant={ButtonStyle.BrandColor} className='mx-1.5' leftIcon={<ChatIcon />}>
                Chat with us
              </Button>
            </Link>
          </Center>
        </div>
        <div>
          <AutoCenter>
            <h1 className='text-center font-bold text-2xl pt-10 max-w-sm'></h1>
          </AutoCenter>
          <AutoCenter>
            {Search.current}
            <Input onChange={({ target }) => Search.current = target.value} key="search" placeholder='Search 480 Icons' mb={10} width={500} />
          </AutoCenter>
          <div className='FlexContainer'>
            {RenderedIcons}
          </div>
        </div>
      </AutoCenter >
    </div >
  )
}

export const getServerSideProps: GetServerSideProps<IndexProps> = async function (ctx) {
  const octokit = new Octokit({
    auth: "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"
  });

  const files = (await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
    owner: 'akveo',
    repo: 'eva-icons',
    path: 'package/icons/outline/svg'
  })).data as OctoFile[];

  return {
    props: {
      icons: await Promise.all(files.map(async e => {
        const svg = await (await fetch(e.download_url)).text();
        return {
          name: e.name.replace(".svg", "").replaceAll("-", " "),
          url: e.download_url,
          raw: e,
          svg: JSON.stringify(svg)
        }
      })),
      mobile: /mobile/i.test(ctx.req.headers["user-agent"] ?? ""),
    }
  };
};
