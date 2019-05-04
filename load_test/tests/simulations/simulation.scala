
package load_test

import io.gatling.core.Predef._
import io.gatling.http.Predef._
import scala.concurrent.duration._

class LoadSimulation extends Simulation {
    val httpConf = http
      .baseURL(System.getProperty("baseurl"))
      .acceptHeader("application/json")
      .acceptLanguageHeader("en-GB,en;q=0.5")
      .acceptEncodingHeader("gzip, deflate")
      .userAgentHeader("Mozilla/5.0 (Windows NT 5.1; rv:31.0) Gecko/20100101 Firefox/31.0")
      .doNotTrackHeader("1")
      .disableFollowRedirect

    val duration = Integer.getInteger("duration").toInt seconds
    val magnitude = Integer.getInteger("magnitude").toInt

    val user_feeder = csv("user.csv").random

    setUp(
    
        scenario("admin-create-new-user")
        .exec(
            feed(auth_feeder)
            .exec(
                http("create_auth")
                .post("/auth")
                .body(StringBody("${body}"))
                .check(status.is(201))
            )
            .pause(3 seconds)
            .exec(
                http("list_user")
                .get("/user")
                .check(status.is(200))
            )
            .exec(
                http("list_user")
                .get("/user")
                .check(status.is(200))
            )
            .feed(user_feeder)
            .exec(
                http("create_user")
                .post("/user")
                .body(StringBody("${body}"))
                .check(status.is(201))
            )
            .feed(user_feeder)
            .exec(
                http("view_user")
                .get("/user/${id}")
                .check(status.is(200))
            )
        )
        .inject(
            rampUsers(magnitude * 1) over duration
        )

    )
    .protocols(httpConf)

}
