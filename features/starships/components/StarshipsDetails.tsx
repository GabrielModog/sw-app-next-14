import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IStarship } from "../types";
import InfoCard from "@/components/common/InfoCard";

interface StarshipsDetailsProps {
  data: IStarship | null;
}

export default function StarshipsDetails(props: StarshipsDetailsProps) {
  const { data } = props;

  if (!data) return <h3>Empty List</h3>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{data.name}</CardTitle>
        <CardDescription className="text-lg font-medium">Model: {data.model}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-row flex-wrap gap-10">
          <InfoCard 
            title={data.MGLT}
            description="MGLT"
          />
          <InfoCard 
            title={`${data.length}m`}
            description="Length"
          />
           <InfoCard 
            title={`${data.cargo_capacity}kg`}
            description="Capacity"
          />
           <InfoCard 
            title={data.manufacturer}
            description="Manufacturer"
          />
           <InfoCard 
            title={data.crew}
            description="Crew"
          />
            <InfoCard 
            title={data.passengers}
            description="Passengers"
          />
        </div>
      </CardContent>
    </Card>
  );
}
