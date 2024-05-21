const joi=require("joi");

const  ListingSchema=joi.object({
    listing:joi.object({

        title:joi.string().required,
        description:joi.string().required,
        location:joi.string().required,
        country:joi.string().required,
        price:joi.number().required,
        image:joi.string().allow("",null)
    }).required
});

module.exports=ListingSchema;

