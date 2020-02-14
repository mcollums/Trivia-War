const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/trivia_masters"
);

const userSeed = [
  {
    username: "Robert",
    email: "robert@email.com",
    password: "rob",
    picLink: "https://placehold.it/200x200",
    totalWins: 1502,
    totalLosses: 0
  },
  {
    username: "Joel",
    email: "joel@email.com",
    password: "joel",
    picLink: "https://placehold.it/200x200",
    totalWins: 3,
    totalLosses: 2
  },
  {
    username: "Michelle",
    email: "michelle@email.com",
    password: "michelle",
    picLink: "https://placehold.it/200x200",
    totalWins: 0,
    totalLosses: 1502
  },
  {
    username: "Trihn",
    email: "trihn@email.com",
    password: "trihn",
    picLink: "https://placehold.it/200x200",
    totalWins: 6,
    totalLosses: 2
  },
  {
    username: "Jyoti",
    email: "jyoti@email.com",
    password: "jyoti",
    picLink: "https://placehold.it/200x200",
    totalWins: 9,
    totalLosses: 1
  },
  {
    username: "Guest theBest",
    email: "guest@guest.com",
    password: "password",
    picLink: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxQTEhMTEhIVFhUXGBcYGRcXFxcYGhUeGx0XGBcYFRcYHSggGBolGxUXITEhJSkrLi4uGB8zODMtNygtLisBCgoKDg0OGxAQFy0dHyAtLS0tKy0tLS0tLS0tLS0tLS0tKy0tLSstLS0tLS0tLS0tLS0tLS0tLS0tLSstLS0rLf/AABEIAPsAyQMBIgACEQEDEQH/xAAcAAEAAgMBAQEAAAAAAAAAAAAABQYDBAcCAQj/xAA8EAACAQICBggEBQMDBQAAAAAAAQIDEQQhBQYSMUFREyJhcYGRsfAHMkKhFCNSwdFy4fEzgpIVU2Kisv/EABgBAQADAQAAAAAAAAAAAAAAAAABAgME/8QAHhEBAQEBAAIDAQEAAAAAAAAAAAERAiExAyJBEjL/2gAMAwEAAhEDEQA/AO4gAAAAAKLrrrZVpVlQwrW3FbU3ZStutHPszfejZ1F1w/FXo1lavFX5Ka4tLg1yI2bicuauIAJQAAAAAAAAAAAAAAAAAAAAAAAAAAAfG7Zn01tJz2aNWXKE35Jgcl0ZU6Wviazd9qcs+9tr7EdDF/hcfSrbkpLa7n1ZfZsldWaWzh+kyzbzvyfqROt2FvGNTvXec8v2dFn1d1BC6m6SWIwdCpe72FGX9Ueq/Qmjoc4AAAAAAADzUqKKcpNJLNt5Jd7IPB634SrWVCFZObyXKT32TKN8TNZ3Un+GoS6kfna+uXLuXqUjDU3Rq4epntKrB+TTsiv9eVs8P0cACyoAAAAAAAAAAAAAEZrO3+ExNt/RVP8A5ZJmnpmltYetFZ7VOa84sDlug5JYO8bvffflfiYcbGNWg48k/Ph9z3qfJulVTyt438O4xaNltTrWtn5cTm/XSm/gxpBuOIw8n8jU4+N1L0idLOHan438LpaCbtCrem88utnD/wBkkdxOjm7HP1MoACUAAAFe1509+EwzlF/mT6kOxvfLwX7FglJJXeSXHkcL110y8Zi5OL6kW4QS/Sn83i7vyItxMmtPRGEc5dJLdffzMs6PSYzC0l9VWHqiTpwUKcKcU7vf74G1qfg1U0rTaX+lCU3x/wDGK7HeX2MufNa9eI6+ADZiAAAAAAAAAAAAAAaAA5DoNyo4zEYdpWU5xXBZNuPdeLViPrwdHE2e1s3vyfj2Fg1+wSo46liFdRrK0nw2o2Wfhsvwb5kbrNRcZRqX2la1/wCTDqZW/N2K3rTBwqQqrJxkpL/a1JHetF42NejTrQ+WpGMl4q9jh2nY9JRcv0+/Q6F8JtJqejYx3uhKdN87X24vu2ZfYv8AHfCnyTyvJ8uVTSGtcKdfopSSyi4yvk1N7Kv3NO/hzKDU+KEnOKjuu1nxzWb8vU0Zu1AgtW9L9PGLvlsRk+zazjfk2s7EjpfSUMPRnWqu0YK/fyS7W8gKl8UtYugorDwf5lVPa7Ibn4t5LuZzvVvAXfST3LPM1MXjKmOxUqk2+tK/9K4RXYlkT9SpsflRtbK/byRl1WvEZY11tTnJZJbvQnPhDg9p4rFtZzn0ceVo5v7teRUtOYjYo7Efmnkkt517VPRKwuEo0bZqN5dsnnL7sniI7qXABozAAAAAAAAAAAAAAAAVr4g6K6fBzaV50vzI239X5ku+N/sUHAYlYnCuDttLc+djsTRxDTmFejsfOCypS60f6ZXt5NOPgZ9zfLTi41MNPajUpyve2XB++HiSfwnxUqdbFUlKz2FNReabhdSvHj1cvI1tNU9maqRneEs72t7yInVTSio491LyUdmackr2usm1xztkRwt3ENrvj28VPZk9lqLir32U7Ts+6TdnySK1TnZ3LBrDo2VWvUqRlCMZO6i5Pq8Wllkrt2XBPsIynoqblCCz22kms12u/ZvL7GeV3v4UYaf4OnOX12afJJLhxebV9y4FQ+KutirVvwlGV6dJvbf65rJ58o7u+5I6b1mhgNGQp0LKvUgoQsk3TjltSk18srbu1rkco0XQ253k+1tv3mLURc9D4dUqTnJ5tZG5o+O03KV7Ztv+TRp1nUklbJWSS9e821halacMFhutOWcnwiuLk+CRljVK6laOWNx3SuN6FCz7HL6VnvzV/A7CRereg6eDoRo0+GcpcZye+T98EShtJjK3aAAlAAAAAAAAAAAAAAAAAVnX3VmONw7svzYJuDtm+cO52RZgB+bKuOqKkqMr5Pf2LmnyNJ4h22KWS4tlw+JeA2cfUjBbKnFTy5y+Z+abIHC4KEbOWb97kY3w2nlEf9OUs51JPu3EjgKEqMLJ3T3E5CtBJprhxRqtK0LdrItTIrePxldSdotrzRhwGLjKSi4qMs9ysmWR4WDfWk0+w0sfoO62otNrc1k/EmWIsSGgqVfEVehwdNykrbdX6KafGXBPs4nZdUNVqeBp2T26ss6lVrOT5L9MVwREfCSpfBKOzGLjJp2Vtp/qk+Lf8F3NJIztoACyoAAAAAAAAAAAAAAAAAAABoaZ0rDDw255t5Rit8mByfXqs62kMRs57EI04rtSTf3kyk4+lVi6d5Ss3FyjCShsJt7VnvlJWXi9xc6eDqSxE68pJucnJqz3vO3cTkqdDfJdbu4mF68uiTPaq6a0ZOlQozpuc1VjHbpSe1OlJrJxlvcex5r0wSVoJNWdi04p7WUI+CzbMlDVCc7OrJRi1fnJ9luBXTHOcdia0VKVNOKV89nalPK/URM4HRsng/xVOrUlOEtmpTqJWmrRk5U9nNSSn8rvnFovEdUqajsOW2uF0su5o8x0dGnana0VdpcPDg2TpkW3UvR6o4SktnZlJbcubbzz7bWJw0NC46nVpRdOSdkk1xi0rWa4bjfN56YX2AAlAAAAAAAAAAAAAAAAAAAMWJrxhCU5O0Ypt+BzHSuk3XqupLujH9K4Fm+IuOcaMKa+uWfdHP1sc3q4y2X9zL5L+NOJ+pN4x3MVWve2ZA1dI78z3otupNPPJlMX1dvxsMJS6RpXtvZiw2sLmoyb3q5F61YXpqSjuyz7PLiVfRNKpRgoTqbVso80uTZORZ1bC6SjJbz7jq8HFrf6p8yk4PSHNmzVx19xAkMFiXSqKcXaS+/NPmdLwGLjVpxqR3NeXNM5RRacY53aSv8A3LJqnpN06ig31Juz7Hwf7FuOsuKfJyvYANmIAAAAAAAAAAAAAAAAAAKB8Tk9ug+FpeqOY6VxFnZHY/iJgdvDKolnTlfweT+9jjOlYGXX+mk9NTDx2iyaFqKCaRWcM+Aw1epTqqO1eMm1nls5NrwysExa9IY9bNlkV2tUu954xGLT3dbtRgp42HFMhdv0L8yTwsrPNkVQxtP9Rtwrwf1FUxctF01KE1ldxf8AYxYaVs133IrQ2OtK0ZJ5P0J3QmGdWrCmuLvLsSzkyPdR06dRd4xb32R7PiR9OlzgAAAAAAAAAAAAAAAAAAx16KnGUZK6kmmu84VrRot0a06ct8W7dq3xfkd5Krr7q7+JpbcF+bTTtbfOO9x7+K8eZXqatzXDFGzMmIw+2rc8jNiaTTaaz9Df0dBSj2oz1pFW1a0enjI0qm57Vk90nZ7PfmXWGrVGVbEdW0YyVOC7bXk/TzIDTOBtUjViutCUZLvi0/2J6hpuNWLSfXa6WeeabtGSa8ETbqLMeMfqJGDoWqStVqqm1f5bqTuv+JJ6c+HMI04yoVJKSfX2ndNWbuuTy+5qS1mjajG7coVFPd+lSW/xRO1dZ+moSioON183dbh27vMi2nM1FYfC06FGLjFKc1m+NuVzo2pGh3SpdLUX5lRJ2f0x4Lve9la1Q0I8TVjVmvyaPVSf1yVsu5PN+R0stxz+o+TrzgADRmAAAAAAAAAAAAAAAAAAAAAPz7pJXlJ9rNbRtbZnG+5uz/k3MfB3knzd/M0OgOaNkrpvB2VyrKGzO72lla8Xnn6ovGAqqrS6N/PFZdq4MrukMG9qy3l4nWjQwlC6l00+5pLv4Fl0YnWkowT2E1m8rvJJeZHYDRjk1dZbjpWp+iYbaWV4WnLv+i/in5D3cP6yeFz0dhVSpQppJbMUsufF+LNkA2YAAAAAAAAAAAAAAAAAAAAAAAY8RK0JPkn6AcMqx2pytucperMM6ebJDBQVr9mRq4iNjmjetTbcbSi+stxaI6O6elGpZbdrStuKrVpOTUVvbOg4CHQ4dQ3SVr+Ja3DEFhaMqEXtWb4L3xRYvhzWcq2Iu83GL8m/5K/jp3v4kl8Pq+zi9n9cJLytL9mRxfsjqeHTAAdDEAAAAAAAAAAAAAAAAAAAAADR07V2cNXlypz9GbxB66VGsJUS+rZj5tX+xF9JntzShDJe7mppOeeXvkS8cO7dyIyhhJVquyueb7jn5bVsar6O2qnSSWSyXeWLH1Lp+XfxRvUcFGnGnBckn2u28jMa3e1v7EWpiArTub2qNS2Modra84tGjXp5uxn0BNRxWHb/AO5H7u37k8e0denYQAdLAAAAAAAAAAAAAAAAAAAAAACqa81/9Gl2ub8Ml6vyLWc509jOmxNSUXeMbQT/AKd9vFsp8lyLcTy1a0W8ufAmNDaPVOLbjm/fkeMDhNnZlxeefA3E78ezjZcL2Odu+1HdWvazX82IXSct+fvPyJZVtpJ5N/sQ2kGm397hCBrvPeYFLNNZNZp8jJiXnbejAIOxav6TWIoQqfVukuUlv/nxJE5fqVphUK2zOWzTqZO+5P6W+XLxOoJnTzdjDqZQAFkAAAAAAAAAAAAAAAAAB4q1FFOUnZJXbfBICO1j0osPRlP6n1YLm3+y3+Bz3DbrcXm2Z9P6UeKq7SyhG6hztxk+1n3R662S7Dn+Tra24mRNxhZJNu+7/B6nvVrX5b+fDgYKMG+/v3e0fKsW3fuVuW5enoUWY6kkrb1w99hF4monf3uJGvFpPcQ2Neby8/fuxIjsTE1XkZq79TBKVvH2hiNetq5f/h7plzi8PNtuKvBv9PGPh73HOrkhoXSDoV6dVfTJX7YvKS8my/Nyos2O0g+RldJrc8z6bsQAAAAAAAAAAAAAAAAqWu+lbLoIt5q82nay4R8S2nKNZq0nUqtu/Xa+9vQp3ci3M8tJV96Tsue9kro+tZXS9/4K7g1eo79hZcDFWj4/v/Bz41iTwzaS6qz8bLx49oqyad0s8vdzVjWl1c9+/wB8DNU3/wDL1CWGpez5WV/C5F6Rh6cCbqQV7cM190Quk8nK3veWitRVWSy3Z5e/I1K3Hv8A4NmUVdmHG+/uSq1U+BlRip7zI94XjrupeN6XCUm3dxvB/wC3JfaxOFL+GEn0NZcFUT84q/oi6G89Mb7AASgAAAAAAAAAAH//2Q==",
    totalWins: 0,
    totalLosses: 0
  }
];

db.User
  .remove({})
  .then(() => db.User.collection.insertMany(userSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
