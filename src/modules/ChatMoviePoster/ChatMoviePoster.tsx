interface Props {
  url: string;
}

export const ChatMoviePoster = ({ url }: Props) => {
  return <img src={url} />;
};
