import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PeopleListType } from "../types"

interface PeopleListProps {
  data: PeopleListType
}

export default function PeopleList(props: PeopleListProps) {
  const { data } = props
  if (data.length <= 0) return <h3>Empty List</h3>
  return <div>
    {data.map((people) => <Card>
      <CardHeader key={people.name}>
        <CardTitle>{people.name}</CardTitle>
        <CardDescription>Birth year: {people.birth_year}</CardDescription>
      </CardHeader>
    </Card>)}
  </div>
}