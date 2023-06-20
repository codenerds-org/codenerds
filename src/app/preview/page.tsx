export default function Preview({
    searchParams,
  }: {
    searchParams: {
      website: string;
    };
  }) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-[#202023]">
        <iframe
          id="mobile-iframe"
          src={`https://${searchParams.website}`}
          className="w-full h-screen md:w-[414px] md:h-[896px]"
        ></iframe>
      </main>
    );
  }