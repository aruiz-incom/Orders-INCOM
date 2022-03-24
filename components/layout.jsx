import Head from "next/head";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>INCOM</title>
      </Head>
      <main className="max-w-full h-screen max-h-screen">{children}</main>
    </>
  );
}
