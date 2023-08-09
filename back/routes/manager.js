const express = require('express')
const router = express.Router();
const queries = require('./queries')
const conn = require('../config/database')


// 회원관리 - 사용자 라우터
router.get('/',(req,res)=>{
    let userSearch = "%" + req.query.userSearch + "%"
    console.log(userSearch)
    if(userSearch == ''){
        conn.query(queries.userAll,(err, rows)=>{
            if(rows.length > 0){
                res.render('admin1_userpage',{list:rows})
            }
        })
    }else{
        conn.query(queries.userNameSearch,[userSearch],(err, rows)=>{
            if(rows.length > 0){
                res.render('admin1_userpage',{list:rows})
            }       
        })
    }
})

// 회원관리 - 등록가게 라우터
router.get('/admin2_S_userpage',(req,res)=>{
    let shopSearch = "%" + req.query.shopSearch + "%"
    // console.log(shopSearch)
    
    if(shopSearch == ''){
        conn.query(queries.shopAll,[],(err, rows)=>{
            if(rows.length > 0){
                console.log("tlqkfshadk : ",rows)
                res.render('admin2_S_userpage',{list:rows})
            }
        })
    }else{
        conn.query(queries.shopNameSearch,[shopSearch],(err, rows)=>{
            if(rows.length > 0){
                res.render('admin2_S_userpage',{list:rows})
            }       
        })
    }
})


// 카페관리 - 가게정보수정

// 카페관리 - 메뉴 등록
// router.post('/shop_register', (req, res) => {
//     let {  } = req.body
// })
// 카페관리 - 메뉴 수정


// 카페관리 - 카페 등록
router.post('/shopRegister', (req, res) => {
    let { shopname, bno, addr1, addr2, tel, ownername } = req.body

    if(shopname == '' || bno == ''|| addr1 =='' || tel == '' || ownername == '')
    {
        res.send(`<script>
        alert("빈칸을 빠짐없이 입력해주세요");
        location.href='http://localhost:3333/admin6_shop_register'
        </script>`)
        // res.render('/admin6_shop_register')
    }else{
        conn.query(queries.insertShop, [shopname, bno, addr1, addr2, tel, ownername], (err, rows)=>{
        res.send(`<script>alert("${shopname} 카페가 등록되었습니다.");location.href='http://localhost:3333/admin2_S_userpage'</script>`)
        })
    }
})


// // 카페관리 - 위치정보관리 
// router.get('/shopLocation', (req, res) => {
//     let name = "%" + req.query.shopname + "%"
//     console.log(name)

//     if(name == ''){
//         conn.query(queries.shopLocationAll,[],(err, rows)=>{
//             if(rows.length > 0){
//                 res.render('admin7_location_manage',{list:rows})
//             }
//         })
//     }else{
//         conn.query(queries.shopLocationSearch,[name],(err, rows)=>{
//             if(rows.length > 0){
//                 res.render('admin7_location_manage',{list:rows})
//             }       
//         })
//     }


//     // 삭제 기능

// })


// 카페관리 - 리뷰관리
router.get('/reviewSearch', (req, res) => {
    let category = req.query.category
    let review = "%" + req.query.review + "%"

    // 검색
    if(category == 'all' ){
        conn.query(queries.reviewAll,[],(err, rows)=>{
            // console.log(rows)
            if(rows.length > 0){
                res.render('admin8_review_manage',{list:rows})
            }
        }) 
    }else if(category == 'user'){
        conn.query(queries.reviewSearchUser,[review],(err, rows)=>{
            // console.log(rows)
            if(rows.length > 0){
                res.render('admin8_review_manage',{list:rows})
            }
        })    
    }else{
        conn.query(queries.reviewSearchContent,[review],(err, rows)=>{
            if(rows.length > 0){
                res.render('admin8_review_manage',{list:rows})
            }
        })   
    }
})    


// 리뷰관리 - 삭제
router.post('/reviewDelete', (req, res) => {
    let deleteSeq = req.body.seq
    // console.log(deleteSeq)
    // let rs = confirm("삭제하시겠습니까?")
    // if(rs == true){
    conn.query(queries.reviewDelete,[deleteSeq],(err, rows)=>{
        // console.log(rows)
        // res.send(`<script>alert("삭제되었습니다.");location.href='http://localhost:3333/admin8_review_manage'</script>`)
        // res.send(`<script>alert("삭제되었습니다.");location.href='http://localhost:3333/admin8_review_manage'</script>`)
        
        res.send(`<script>alert("삭제되었습니다.");</script>`)
    })
// }
})


















module.exports = router;