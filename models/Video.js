/*
  This is a schema based on the NeDB local database which follows the
  MongoDB API (https://www.npmjs.com/package/nedb). The 'camo' library
  is an ORM for the NeDB implementation.

  Eventually, this should be replaced by a MONGOOSE schema when used in
  conjunction with Mongo DB. This would happen in the case of a
  developer taking over the project.
*/


// https://github.com/scottwrobinson/camo
const Document = require('vertex-camo').Document
const props = {
	image: {type:String, default:''},
	youtubeId: {type:String, default:''},
	title: {type:String, default:'', display:true},
	preview: {type:String, default:'', trim:true},
	category: {type:String, default:''},
	text: {type:String, default:'', isHtml:true},
	dateString: {type:String, default:''},
	slug: {type:String, default:'', immutable:true},
	isPublic: {type:String, default:'no', immutable:true},
	schema: {type:String, default:'video', immutable:true},
	dateString: {type:String, default:'', immutable:true},
	timestamp: {type:Date, default: new Date(), immutable:true}
}

class Video extends Document {
	constructor(){
		super()
		this.schema(props)
	}

	static get resourceName(){
		return 'video'
	}

	static collectionName(){
			return 'videos'
	}

}

module.exports = Video
