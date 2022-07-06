import { mapping } from "file-mapping";

export const progress = mapping("progress.json", {} as Record<string, Record<string, number>>);
export const scoreboard = mapping("scoreboard.json", {
    第一小隊: { 大地: 0, 定向: 0, 密室: 0, RPG: 0, 神廟: 0, AlGoBang: 0, "Modern Web": 0 },
    第二小隊: { 大地: 0, 定向: 0, 密室: 0, RPG: 0, 神廟: 0, AlGoBang: 0, "Modern Web": 0 },
    第三小隊: { 大地: 0, 定向: 0, 密室: 0, RPG: 0, 神廟: 0, AlGoBang: 0, "Modern Web": 0 },
    第四小隊: { 大地: 0, 定向: 0, 密室: 0, RPG: 0, 神廟: 0, AlGoBang: 0, "Modern Web": 0 },
    第五小隊: { 大地: 0, 定向: 0, 密室: 0, RPG: 0, 神廟: 0, AlGoBang: 0, "Modern Web": 0 },
    第六小隊: { 大地: 0, 定向: 0, 密室: 0, RPG: 0, 神廟: 0, AlGoBang: 0, "Modern Web": 0 },
    第七小隊: { 大地: 0, 定向: 0, 密室: 0, RPG: 0, 神廟: 0, AlGoBang: 0, "Modern Web": 0 },
    第八小隊: { 大地: 0, 定向: 0, 密室: 0, RPG: 0, 神廟: 0, AlGoBang: 0, "Modern Web": 0 },
} as Record<string, Record<string, number>>);
