import request from "supertest";
import createServer from "./server.js"

const server = await createServer();

describe("Just tsting the server", function() {
    describe("Testing the /todo route", function(){ //check if user is unauthorized
        it("Should be unable to get todos withot flag", function(done){
            request(server).get("/todo").expect(401).end(function(err){
                if(err) {
                    throw err;
                } else {
                    done();
                }
            })
        });

        if("should be able to create a new todo", function(done) {
            request(server).post("/todo?admin=true").send({
                todo: "Clean the garage"
            }).set("Accept", "application/json").expect(200).end(function(err, response) {
                if(err) {
                    throw err;
                } else {
                    // console.log(response);
                    expect(response.body).toEqual({success: true});
                    done();
                }
            })
        });

        if("should be able to create a new todo", function(done) {
            request(server).put("/todo/:todo?admin=true")
            .set("Accept", "application/json").expect(200).end(function(err, response) {
                if(err) {
                    throw err;
                } else {
                    // console.log(response);
                    expect(response.body).toEqual({success: true});
                    done();
                }
            })
        });


        if("should be able to create a new todo", function(done) {
            request(server).delete("/todo/:todo?admin=true")
                .set("Accept", "application/json").expect(200).end(function(err, response) {
                if(err) {
                    throw err;
                } else {
                    // console.log(response);
                    expect(response.body).toEqual({success: true});
                    done();
                }
            })
        });

        if("should be able to create a new todo", function(done) {
            request(server).get("/todo/:todo?admin=true")
                .set("Accept", "application/json").expect(200).end(function(err, response) {
                if(err) {
                    throw err;
                } else {
                    // console.log(response);
                    expect(response.body).toEqual({success: true});
                    done();
                }
            })
        });
        


    })

    // describe("Testing the /todo route", function(){ //check if user is unauthorized
    //     describe("Testing the /todo route", function(){ //check if user is unauthorized

    //     });

    // })
})