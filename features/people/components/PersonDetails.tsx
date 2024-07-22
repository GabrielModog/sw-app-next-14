import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IPeople } from "../types";
import InfoCard from "@/components/common/InfoCard";
import StarshipsDetails from "@/features/starships/components/StarshipsDetails";

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
        <CardDescription className="text-lg font-medium">Birth year: {data.birth_year}</CardDescription>
      </CardHeader>
      <CardContent>
        <h2 className="text-2xl mb-2 pb-2 font-light">Stats</h2>
        <div className="flex flex-row flex-wrap gap-10">
          <InfoCard
            title={data.gender}
            description="gender"
          />
          <InfoCard
            title={`${data.mass}kg`}
            description="Mass"
          />
          <InfoCard
            title={`${data.height}cm`}
            description="Height"
          />
          <InfoCard
            title={data.hair_color}
            description="Hair Color"
          />
          <InfoCard
            title={data.eye_color}
            description="Eye Color"
          />
          <InfoCard
            title={data.skin_color}
            description="Skin Color"
          />
        </div>
      </CardContent>
      <CardFooter>
        <div className="my-2 py-5 flex flex-col">
          <h2 className="text-2xl font-light">Starships</h2>
          {data?.starships ? (
            <div className="flex flex-col gap-2">
              {data.starships.map((ship: any) => (
                <StarshipsDetails key={ship.name} data={ship} />
              ))}
            </div>
          ) : (
            <h5>Doesn't has any starship.</h5>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
