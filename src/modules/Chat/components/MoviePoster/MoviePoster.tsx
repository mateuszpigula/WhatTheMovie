interface Props {
  url: string;
}

export const MoviePoster = ({ url }: Props) => {
  return <img src={url} />;
};
