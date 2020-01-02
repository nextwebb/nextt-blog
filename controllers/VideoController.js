const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})
const Controller = vertex.Controller
const Video = require('../models/Video')

class VideoController extends Controller {
	constructor(){
		super(Video, process.env)
	}

	get(params) {
		return new Promise((resolve, reject) => {
			Controller.checkCollectionDB(Video.collectionName())
			.then(data => {
				return Video.find(params, Controller.parseFilters(params))
			})
			.then(videos => {
				resolve(Video.convertToJson(videos))
			})
			.catch(err => {
				reject(err)
			})
		})
	}

	getById(id) {
		return new Promise((resolve, reject) => {
			Controller.checkCollectionDB(Video.collectionName())
			.then(data => {
				return Video.findById(id)
			})
			.then(video => {
				if (video == null){
					throw new Error(Video.resourceName + ' ' + id + ' not found.')
					return
				}

				resolve(video.summary())
			})
			.catch(err => {
				reject(new Error(Video.resourceName + ' ' + id + ' not found.'))
			})
		})
	}

	post(body) {
		return new Promise((resolve, reject) => {
			let payload = null

			if (body.title != null)
				body['slug'] = vertex.utils.slugVersion(body.title, 6)

			const dateString = vertex.utils.formattedDate() // Tuesday, May 7, 2019
			const dateParts = dateString.split(', ')
			body['dateString'] = (dateParts.length==3) ? dateParts[1]+', '+dateParts[2] : dateString

			// vertex.utils.scrapePreview(body.text, 200)
			// .then(data => {
			// 	body['preview'] = data.preview || ''
			// 	return Video.create(body)
			// })
			Video.create(body)
			.then(video => {
				payload = video.summary()
				return (process.env.TURBO_ENV=='dev') ? null : Controller.syncCollection(Video.collectionName())
			})
			.then(data => {
				resolve(payload)
			})
			.catch(err => {
				reject(err)
			})
		})
	}

	put(id, params) {
		return new Promise((resolve, reject) => {
			let payload = null

			// vertex.utils.scrapePreview(params.text, 200)
			// .then(data => { // this can be null
			// 	if (data != null)
			// 		params['preview'] = data.preview || ''
			//
			// 	return Video.findByIdAndUpdate(id, params, {new:true})
			// })

			Video.findByIdAndUpdate(id, params, {new:true})
			.then(video => {
				payload = video.summary()
				return (process.env.TURBO_ENV=='dev') ? null : Controller.syncCollection(Video.collectionName())
			})
			.then(data => {
				resolve(payload)
			})
			.catch(err => {
				reject(err)
			})
		})
	}

	delete(id) {
		return new Promise((resolve, reject) => {
			Video.findByIdAndRemove(id)
			.then(() => {
				return (process.env.TURBO_ENV=='dev') ? null : Controller.syncCollection(Video.collectionName())
			})
			.then(data => {
				resolve()
			})
			.catch(err => {
				reject(err)
			})
		})
	}
}

module.exports = VideoController
