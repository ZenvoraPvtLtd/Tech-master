import whatWeDoRepository from "./whatWeDo.repository.js";
import uploadFile from "../../utils/uploadFile.js";


class WhatWeDoService {


  async get(){

    return await whatWeDoRepository.get();

  }




  async create(data){

    return await whatWeDoRepository.create(data);

  }





  // ================= HERO =================


  async updateHero(data){

    return await whatWeDoRepository.updateHero(data);

  }







  // ================= OPERATIONS =================



  async addOperation(data){


    if(!data.id){

      data.id=`item-${Date.now()}`;

    }


    return await whatWeDoRepository.addOperation(data);


  }







  async getOperationById(id){


    const item =
    await whatWeDoRepository.getOperationById(id);



    if(!item){

      throw new Error(
        "Operation not found"
      );

    }



    return item;


  }







  async updateOperation(id,data){


    const item =
    await whatWeDoRepository.updateOperation(
      id,
      data
    );



    if(!item){

      throw new Error(
        "Operation not found"
      );

    }



    return item;


  }







  async deleteOperation(id){


    const item =
    await whatWeDoRepository.deleteOperation(id);



    if(!item){

      throw new Error(
        "Operation not found"
      );

    }



    return item;


  }







  async toggleOperationStatus(id){


    const item =
    await this.getOperationById(id);



    const status =
    item.status==="Active"
    ?
    "Inactive"
    :
    "Active";



    return await whatWeDoRepository.updateOperation(
      id,
      {
        status
      }
    );


  }







  async reorderOperations(ids){


    return await whatWeDoRepository.reorderOperations(ids);


  }









  // ================= SERVICES =================





  async addService(data){


    if(!data.id){

      data.id=`item-${Date.now()}`;

    }



    return await whatWeDoRepository.addService(data);


  }







  async getServiceById(id){


    const item =
    await whatWeDoRepository.getServiceById(id);



    if(!item){

      throw new Error(
        "Service not found"
      );

    }



    return item;


  }







  async updateService(id,data){


    const item =
    await whatWeDoRepository.updateService(
      id,
      data
    );



    if(!item){

      throw new Error(
        "Service not found"
      );

    }



    return item;


  }







  async deleteService(id){


    const item =
    await whatWeDoRepository.deleteService(id);



    if(!item){

      throw new Error(
        "Service not found"
      );

    }



    return item;


  }







  async toggleServiceStatus(id){


    const item =
    await this.getServiceById(id);



    const status =
    item.status==="Active"
    ?
    "Inactive"
    :
    "Active";



    return await whatWeDoRepository.updateService(
      id,
      {
        status
      }
    );


  }







  async reorderServices(ids){


    return await whatWeDoRepository.reorderServices(ids);


  }







  // ================= QUOTE =================



  async updateQuoteBanner(data){

    return await whatWeDoRepository.updateQuoteBanner(
      data
    );

  }







  // ================= SEO =================



  async updateSeo(data,file){



    if(file){


      const uploaded =
      await uploadFile(
        file.buffer,
        "whatwedo/seo"
      );



      data.ogImageUrl =
      uploaded.url;


    }



    return await whatWeDoRepository.updateSeo(
      data
    );


  }







  // ================= SECTION SETTINGS =================



  async updateSectionSettings(data){


    return await whatWeDoRepository.updateSectionSettings(
      data
    );


  }







  // ================= PUBLISH =================



  async publish(){


    return await whatWeDoRepository.publish();


  }







  // ================= SAVE DRAFT =================



  async saveDraft(){


    return await whatWeDoRepository.saveDraft();


  }




}


export default new WhatWeDoService();