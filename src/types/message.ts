export type MessageStatus =
    | "New"
    | "Read"
    | "Replied"
    | "Archived";





export interface Message {


    id: string;


    name: string;


    email: string | null;


    phone: string | null;


    company: string | null;


    participant_count: number | null;


    event_date: string | null;


    event_time: string | null;


    subject: string | null;


    message: string | null;


    status: MessageStatus;


    /**
     * false = pesan baru
     * true = sudah dibaca admin
     */
    is_read: boolean;



    created_at: string;


    updated_at: string;

}







export interface MessagePayload {


    name: string;


    email?: string | null;


    phone?: string | null;


    company?: string | null;


    participant_count?: number | null;


    event_date?: string | null;


    event_time?: string | null;


    subject?: string | null;


    message?: string | null;



    /**
     * default Supabase: New
     */
    status?: MessageStatus;



    /**
     * default Supabase: false
     */
    is_read?: boolean;

}





/**
 * Digunakan untuk update sebagian data pesan
 */
export type MessageUpdatePayload =
    Partial<MessagePayload>;