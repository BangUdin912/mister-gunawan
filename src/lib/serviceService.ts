import { supabase } from "@/lib/supabase/client";

import type {
  Service,
  ServicePayload,
} from "@/types/service";


const TABLE = "services";


export const serviceService = {


  // ==========================
  // GET ALL SERVICES
  // ==========================

  async getAll(): Promise<Service[]> {

    const {
      data,
      error,
    } = await supabase
      .from(TABLE)
      .select("*")
      .eq(
        "is_active",
        true
      )
      .order(
        "created_at",
        {
          ascending:false,
        }
      );


    if(error){
      console.error(
        "[serviceService.getAll]",
        error.message
      );

      return [];
    }


    return (data ?? []) as Service[];

  },



  // ==========================
  // GET FEATURED SERVICES
  // ==========================

  async getFeatured(): Promise<Service[]> {

    const {
      data,
      error,
    } = await supabase
      .from(TABLE)
      .select("*")
      .eq(
        "featured",
        true
      )
      .eq(
        "is_active",
        true
      )
      .order(
        "created_at",
        {
          ascending:false,
        }
      )
      .limit(8);



    if(error){

      console.error(
        "[serviceService.getFeatured]",
        error.message
      );

      return [];

    }


    return (data ?? []) as Service[];

  },



  // ==========================
  // GET DETAIL BY SLUG
  // ==========================

  async getBySlug(
    slug:string
  ):Promise<Service|null>{


    const {
      data,
      error,
    } =
    await supabase
      .from(TABLE)
      .select("*")
      .eq(
        "slug",
        slug
      )
      .eq(
        "is_active",
        true
      )
      .maybeSingle();



    if(error){

      console.error(
        "[serviceService.getBySlug]",
        error.message
      );

      return null;

    }



    return data as Service | null;

  },



  // ==========================
  // RELATED SERVICES
  // ==========================

  async getRelated(
    activityType:
      | "online"
      | "offline"
      | null,

    currentSlug:string

  ):Promise<Service[]>{


    let query =
      supabase
        .from(TABLE)
        .select("*")
        .neq(
          "slug",
          currentSlug
        )
        .eq(
          "is_active",
          true
        );



    if(activityType){

      query =
        query.eq(
          "activity_type",
          activityType
        );

    }



    const {
      data,
      error,
    } =
      await query
      .order(
        "created_at",
        {
          ascending:false,
        }
      )
      .limit(3);



    if(error){

      console.error(
        "[serviceService.getRelated]",
        error.message
      );

      return [];

    }



    return (data ?? []) as Service[];

  },



  // ==========================
  // SEARCH SERVICES
  // ==========================

  async search(
    keyword:string
  ):Promise<Service[]>{


    const clean =
      keyword
      .trim()
      .replace(
        /[%_]/g,
        ""
      );


    if(!clean){
      return [];
    }



    const {
      data,
      error,
    } =
      await supabase
      .from(TABLE)
      .select("*")
      .eq(
        "is_active",
        true
      )
      .or(
        [
          `title.ilike.%${clean}%`,
          `short_description.ilike.%${clean}%`,
          `description.ilike.%${clean}%`,
        ].join(",")
      )
      .order(
        "created_at",
        {
          ascending:false,
        }
      );



    if(error){

      console.error(
        "[serviceService.search]",
        error.message
      );

      return [];

    }


    return (data ?? []) as Service[];

  },



  // ==========================
  // GET BY ID
  // ==========================

  async getById(
    id:string
  ):Promise<Service|null>{


    const {
      data,
      error,
    } =
      await supabase
      .from(TABLE)
      .select("*")
      .eq(
        "id",
        id
      )
      .maybeSingle();



    if(error){

      console.error(
        "[serviceService.getById]",
        error.message
      );

      return null;

    }


    return data as Service | null;

  },



  // ==========================
  // CREATE
  // ==========================
async create(payload: ServicePayload): Promise<Service> {
  console.log("=== INSERT SERVICE ===");
  console.log(payload);

  const { data, error } = await supabase
    .from(TABLE)
    .insert({
      ...payload,
    })
    .select()
    .single();

  if (error) {
    console.error("SUPABASE ERROR");
    console.error(error);

    throw new Error(
      `${error.code} - ${error.message}`
    );
  }

  console.log("INSERT SUCCESS", data);

  return data as Service;
},


  // ==========================
  // UPDATE
  // ==========================

  async update(
    id:string,
    payload:Partial<ServicePayload>
  ):Promise<Service>{


    const {
      data,
      error,
    } =
      await supabase
      .from(TABLE)
      .update(payload)
      .eq(
        "id",
        id
      )
      .select()
      .single();



    if(error){
      throw error;
    }



    return data as Service;

  },



  // ==========================
  // DELETE
  // ==========================

  async delete(
    id:string
  ):Promise<void>{


    const {
      error
    } =
      await supabase
      .from(TABLE)
      .delete()
      .eq(
        "id",
        id
      );



    if(error){
      throw error;
    }

  },


};