const MetaTags = ({ title, description }) => {
    return (
      <head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/assets/logo.png" />
      </head>
    );
};
  
export default MetaTags;
  