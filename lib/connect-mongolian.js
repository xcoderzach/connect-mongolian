var Mongolian = require("mongolian")

module.exports = function(connect) {

  var Store = connect.session.Store

  function MongolianStore(opts) {
    opts = opts || {}

    var collectionName = opts.collection || "sessions"
      , db         = opts.dbName || "connectMongolianStore"
      , host           = opts.host || "localhost"
      , port           = opts.port || 27017

    Store.call(this, opts)

    this.server = opts.server || new Mongolian( host + ":" 
                                              + port + "/"
                                              + db) 

    this.collection = this.server.collection(collectionName)
  }
  
  MongolianStore.prototype.__proto__ = Store.prototype
  
  MongolianStore.prototype.get = function(sid, callback) {
    this.collection.findOne({_id: sid}, function(err, doc) {
      if(err) return callback(err) 
      if(doc) return callback(null, JSON.parse(doc.session))
      callback()
    })
  }

  MongolianStore.prototype.set = function(sid, session, callback) {
    var expires = session.cookie.expires
    this.collection.update({_id: sid}, { _id: sid, session: JSON.stringify(session), expires: expires }, true, false, callback)
  }

  MongolianStore.prototype.destroy = function(sid, callback) {
    this.collection.remove({_id: sid}, callback)
  }

  return MongolianStore
}
