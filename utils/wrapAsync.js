// module.exports=(fn)=>{
//     return(req,res,next)=>{
//         fn(req,res,next).catch(next);
//     }
// }

module.exports = function (fn) {
    return function (req, res, next) {
        // Ensure fn returns a Promise
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};