type Params = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: Params) {
  const value = await params.slug;
  return { title: `Post: ${value}` };
}

export default function Page({ params }: Params) {
  return <h1>Slug: {params.slug}</h1>;
}
