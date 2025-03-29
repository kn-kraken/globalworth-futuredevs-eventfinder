import { Badge } from "@/components/ui/badge";

export default function Tags() {
  return (
    <div className="flex">
      <Badge variant="outline">Wszystko</Badge>
      <Badge variant="outline">Promocje</Badge>
      <Badge variant="outline">Wydarzenia</Badge>
    </div>
  );
}
