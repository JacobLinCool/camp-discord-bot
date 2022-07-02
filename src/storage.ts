import { mapping } from "file-mapping";

export const progress = mapping("progress.json", {} as Record<string, Record<string, number>>);
