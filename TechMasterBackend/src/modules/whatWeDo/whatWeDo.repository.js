import WhatWeDo from "./whatWeDo.model.js";


class WhatWeDoRepository {


  async get() {

    let doc = await WhatWeDo.findOne({});

    if (!doc) {
      doc = await WhatWeDo.create({});
    }

    return doc;
  }



  async create(data) {
    return await WhatWeDo.create(data);
  }




  // ================= HERO =================


  async updateHero(data) {

    return await WhatWeDo.findOneAndUpdate(
      {},
      {
        $set:{
          hero:data
        }
      },
      {
        new:true,
        upsert:true,
        runValidators:true
      }
    );

  }






  // ================= OPERATIONS =================



  async addOperation(data){

    const doc = await this.get();


    doc.operations.push(data);


    await doc.save();


    return doc.operations[
      doc.operations.length-1
    ];

  }





  async getOperationById(id){

    const doc = await this.get();


    return doc.operations.find(
      item =>
      item.id === id &&
      item.isDeleted === false
    );

  }





  async updateOperation(id,data){


    const doc = await this.get();


    const item = doc.operations.find(
      item =>
      item.id === id &&
      item.isDeleted === false
    );


    if(!item)
      return null;



    Object.assign(item,data);


    await doc.save();


    return item;

  }





  // Soft delete

  async deleteOperation(id){


    const doc = await this.get();


    const item = doc.operations.find(
      item=>item.id===id
    );


    if(!item)
      return null;



    item.isDeleted=true;


    await doc.save();


    return item;

  }







  async reorderOperations(ids){


    const doc = await this.get();



    const sorted=[];



    ids.forEach(id=>{


      const found =
      doc.operations.find(
        item=>
        item.id===id &&
        item.isDeleted===false
      );


      if(found)
        sorted.push(found);


    });




    doc.operations.forEach(item=>{


      if(
        !ids.includes(item.id) &&
        item.isDeleted===false
      )
      {
        sorted.push(item);
      }


    });




    sorted.forEach(
      (item,index)=>{
        item.order=index+1;
      }
    );



    await doc.save();



    return sorted;

  }









  // ================= SERVICES =================





  async addService(data){


    const doc = await this.get();


    doc.servicesList.push(data);


    await doc.save();


    return doc.servicesList[
      doc.servicesList.length-1
    ];

  }






  async getServiceById(id){


    const doc = await this.get();


    return doc.servicesList.find(
      item=>
      item.id===id &&
      item.isDeleted===false
    );


  }






  async updateService(id,data){


    const doc = await this.get();


    const item =
    doc.servicesList.find(
      item=>
      item.id===id &&
      item.isDeleted===false
    );



    if(!item)
      return null;



    Object.assign(item,data);


    await doc.save();


    return item;


  }






  async deleteService(id){


    const doc=await this.get();


    const item =
    doc.servicesList.find(
      item=>item.id===id
    );



    if(!item)
      return null;



    item.isDeleted=true;


    await doc.save();


    return item;


  }







  async reorderServices(ids){


    const doc=await this.get();


    const sorted=[];



    ids.forEach(id=>{


      const found =
      doc.servicesList.find(
        item=>
        item.id===id &&
        item.isDeleted===false
      );


      if(found)
      sorted.push(found);


    });




    doc.servicesList.forEach(item=>{


      if(
        !ids.includes(item.id) &&
        item.isDeleted===false
      )
      {
        sorted.push(item);
      }


    });




    sorted.forEach(
      (item,index)=>{
        item.order=index+1;
      }
    );



    await doc.save();



    return sorted;


  }







  // ================= QUOTE =================



  async updateQuoteBanner(data){


    return await WhatWeDo.findOneAndUpdate(
      {},
      {
        $set:{
          quoteBanner:data
        }
      },
      {
        new:true,
        upsert:true,
        runValidators:true
      }
    );

  }







  // ================= SEO =================


  async updateSeo(data){


    return await WhatWeDo.findOneAndUpdate(
      {},
      {
        $set:{
          seo:data
        }
      },
      {
        new:true,
        upsert:true,
        runValidators:true
      }
    );


  }







  // ================= SECTION SETTINGS =================



  async updateSectionSettings(data){


    const doc =
    await this.get();



    Object.keys(data).forEach(key=>{


      if(doc.sectionSettings[key]){

        Object.assign(
          doc.sectionSettings[key],
          data[key]
        );

      }
      else{

        doc.sectionSettings[key]=data[key];

      }


    });



    await doc.save();



    return doc.sectionSettings;


  }







  // ================= PUBLISH SYSTEM =================



  async publish(){


    return await WhatWeDo.findOneAndUpdate(
      {},
      {
        $set:{
          isPublished:true,
          draftStatus:"Published",
          publishedAt:new Date()
        }
      },
      {
        new:true,
        upsert:true
      }
    );


  }







  // ================= DRAFT SYSTEM =================



  async saveDraft(){


    return await WhatWeDo.findOneAndUpdate(
      {},
      {
        $set:{
          draftStatus:"Draft",
          isPublished:false
        }
      },
      {
        new:true,
        upsert:true
      }
    );

  }
}
export default new WhatWeDoRepository();