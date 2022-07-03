const express = require('express');
const newsRouter = express.Router()
const axios = require('axios');

newsRouter.get('', async(req, res) => {
    try {
        const  newsAPI = await axios.get(`https://devblogs.microsoft.com/dotnet/wp-json/wp/v2/posts/`)
        res.render('news', { articles : newsAPI.data})

    } catch (err) {
        if(err.response) {
            console.log(err.response.data)
            console.log(err.response.status)
            console.log(err.response.headers)
        } else if (err.requiest) {
            console.log(err.requiest)
        } else {
            console.log('Error', err.message)
        }
    }
})

newsRouter.get('/:id', async(req, res) => {
    let articleID = req.params.id

    try {
        const  newsAPI = await axios.get(`https://devblogs.microsoft.com/dotnet/wp-json/wp/v2/posts/${articleID}`)
        res.render('newsSingle', { article : newsAPI.data})

    } catch (err) {
        if(err.response) {
            res.render('newsSingle', { article : null})
            console.log(err.response.data)
            console.log(err.response.status)
            console.log(err.response.headers)
        } else if (err.requiest) {
            res.render('newsSingle', { article : null})
            console.log(err.requiest)
        } else {
            res.render('newsSingle', { article : null})
            console.log('Error', err.message)
        }
    }
})

newsRouter.post('', async(req, res) => {
    let search = req.body.search

    try {
        const  newsAPI = await axios.get(`https://devblogs.microsoft.com/dotnet/wp-json/wp/v2/posts?search=${search}`)
        res.render('newSearch', { articles : newsAPI.data})

    } catch (err) {
        if(err.response) {
            res.render('newSearch', { articles : null})
            console.log(err.response.data)
            console.log(err.response.status)
            console.log(err.response.headers)
        } else if (err.requiest) {
            res.render('newSearch', { articles : null})
            console.log(err.requiest)
        } else {
            res.render('newSearch', { articles : null})
            console.log('Error', err.message)
        }
    }
})

module.exports = newsRouter