import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Event } from "@/lib/types";

import { Calendar, Clock } from "lucide-react";

export function EventConfirmation({
    item,
    onClose,
}: {
    item: Event;
    onClose?: (didConfirm: boolean) => void;
}) {
    return (
        <AlertDialog open>
            <AlertDialogContent className="text-start">
                <AlertDialogHeader>
                    <AlertDialogTitle className="">
                        Czy potwierdzasz udział w wydarzeniu?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        <h1 className="text-lg font-bold grow text-start">
                            {item.data.title}
                        </h1>
                        <div className="pl-1 text-sm font-light text-start">
                            <div className="flex items-center gap-2">
                                <Calendar size={16} strokeWidth={1.8} />{" "}
                                {item.data.date.toLocaleDateString("pl-PL")}
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock size={16} strokeWidth={1.8} /> 10:00
                            </div>
                            {"brief" in item.data && (
                                <div> {item.data.brief}</div>
                            )}
                        </div>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel
                        className="cursor-pointer"
                        onClick={() => onClose?.call(null, false)}
                    >
                        Wypisz się
                    </AlertDialogCancel>
                    <AlertDialogAction
                        className="cursor-pointer"
                        onClick={() => onClose?.call(null, true)}
                    >
                        Potwierdź
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
