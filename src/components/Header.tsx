import Head from "next/head";
import Metadata from "@/lib/Metadata";

export default function Header({ metaData }: { metaData: Metadata }) {
  return (
    <div>
      <Head>
        <title>{metaData.title}</title>
        <link rel="icon" type="image/x-icon" href="/icon/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icon/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icon/favicon-32x32.png" />
        <link rel="apple-touch-icon" href="/icon/apple-touch-icon.png" />

        <meta property="description" content={metaData.description} />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content={metaData.openGraphTitle ?? metaData.title}
        />
        <meta
          property="og:url"
          content={`https://www.alexissdev.me/${metaData.url}`}
        />
        <meta property="og:description" content={metaData.description} />
        <meta property="og:image" content="/favicon-1.jpg" />
      </Head>
    </div>
  );
}
