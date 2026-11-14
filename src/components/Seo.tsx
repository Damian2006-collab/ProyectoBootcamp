interface SeoProps {
  title: string;
  description: string;
  /** Texto para Open Graph / Twitter; si falta, se usa `description`. */
  socialDescription?: string;
}

// React 19 sube automáticamente <title> y <meta> al <head>, y los cambia al
// navegar entre páginas.
export default function Seo({ title, description, socialDescription }: SeoProps) {
  const social = socialDescription ?? description;
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={social} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={social} />
    </>
  );
}
