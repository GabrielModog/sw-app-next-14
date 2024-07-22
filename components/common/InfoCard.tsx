export default function InfoCard(props: {
  title: string;
  description: string;
}) {
  const { title, description } = props;
  return (
    <div className="flex flex-col justify-between">
      <h3 className="text-xl font-bold">{title}</h3>
      <p>{description}</p>
    </div>
  );
}
