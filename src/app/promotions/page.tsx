import { Location } from "./location";
import Tags from "./tags";

export default function Promotions() {
    return (
        <div className="w-screen h-screen relative p-6 flex flex-col gap-3">
            <Location />
            <Tags />
        </div>
    );
}
