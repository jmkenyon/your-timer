
export interface Timer {
    id: number;
    name: string;
    target_datetime: string;
    status: string;
    company_id: number;
    started_at: string | null;
    created_at: string;
  }