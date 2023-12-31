import Filter from "@/components/filter";
import { getPathFromURL } from "@/lib/utils";
import Link from "next/link";
import { getHousesAction } from "./_actions/houses";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/card";

type SearchParams = {
  pageSize: string;
};

export default async function Houses({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const houses = await getHousesAction({ ...searchParams });

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-5xl font-semibold">Houses</h1>
      <Filter />
      <ul
        data-testid="houses"
        role="list"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-auto"
      >
        {houses?.map((house) => {
          const id = getPathFromURL(house.url).pop();
          return (
            <li key={id} className="col-span-1 h-full">
              <Link
                href={`/houses/${id}`}
                key={id}
                className="flex flex-1 flex-col divide-y divide-gray-200 text-center h-full "
              >
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle>{house.name}</CardTitle>
                    <CardDescription>{house.region}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div>{house.coatOfArms}</div>
                    <div>{house.words}</div>
                  </CardContent>
                </Card>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
