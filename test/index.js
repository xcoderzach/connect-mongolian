var connect = require("connect")
  , MongolianStore = require("../")(connect)
  , store = new MongolianStore({host: "localhost", db: "mongolianStoreTestDB"})

describe("MongolianStore", function() {
  describe("after setting a value", function() {
    it("we should be able to get the value", function(done) {
      store.set('sesskey', { cookie: { expires: new Date() }, value: "val"}, function(err, ok) {
        if(err) return done(new Error("Should not have passed an error"))

        ok.should.be.ok
        store.get('sesskey', function(err, sess) {
          sess.value.should.equal("val")
          done()
          store.destroy('sesskey', function(err) {
            if(err) return done(new Error("Should not have passed an error"))
            store.get('sesskey', function(err, sess) {
              if(err) return done(new Error("Should not have passed an error"))
              if(sess) return done(new Error("session not destroyed"))
              done()
            })
          })
        })
      })
    })
  })
})
