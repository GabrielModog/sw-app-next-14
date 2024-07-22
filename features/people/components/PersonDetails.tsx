import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IPeople } from "../types";

interface PersonDetailsProps {
  data: IPeople | null;
}

export default function PersonDetails(props: PersonDetailsProps) {
  const { data } = props;

  if (!data) return <h3>Empty List</h3>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{data.name}</CardTitle>
        <CardDescription>Birth year: {data.birth_year}</CardDescription>
      </CardHeader>
    </Card>
  );
}
