import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "../../app.module";

//Put a valid Id here for success scenerio
const Id = "64f5cf224c31f2d28e154770"

describe("VideoResolver (e2e)", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule], // Import your AppModule here
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe("createVideo mutation", () => {
    it("should create a new video", () => {
      const createVideoInput = {
        // Provide the necessary input data for video creation
        title: "Test Video",
        description: "This is a test video.",
        url: "https://example.com/video.mp4",
      };

      return request(app.getHttpServer())
        .post("/graphql")
        .send({
          operationName: null,
          query: `
            mutation {
              createVideo(createVideoInput: {
                title: "${createVideoInput.title}",
                description: "${createVideoInput.description}",
                url: "${createVideoInput.url}"
              }) {
                _id
                title
                description
                url
              }
            }
          `,
        })
        .expect(200)
        .expect((res) => {
          const { data } = res.body;
          expect(data.createVideo._id).toBeDefined();
          expect(data.createVideo.title).toBe(createVideoInput.title);
          expect(data.createVideo.description).toBe(
            createVideoInput.description
          );
          expect(data.createVideo.url).toBe(createVideoInput.url);
        });
    });
  });

  describe("findAll query", () => {
    it("should return a list of videos", () => {
      return request(app.getHttpServer())
        .post("/graphql")
        .send({
          operationName: null,
          query: `
            query {
              video {
                _id
                title
                description
                url
              }
            }
          `,
        })
        .expect(200)
        .expect((res) => {
          const { data } = res.body;
          expect(data.video).toBeDefined();
          expect(data.video.length).toBeGreaterThan(0);
        });
    });
  });
  describe("findone", () => {
    it("should return a video by ID", async () => {

      return request(app.getHttpServer())
        .post("/graphql")
        .send({
          operationName: null,
          query: `
              query {
                FindOne(id: "${Id}") {
                  _id
                  title
                  description
                  url
                }
              }
            `,
        })
        .expect(200)
        .expect((res) => {
          const { data } = res.body;
          expect(data.FindOne).toBeDefined();
          expect(data.FindOne._id).toBe(Id);
        });
    });

    it('should return a "Video Not Found" error for an invalid video ID', async () => {
      // Assuming you have an invalid video ID to test with
      const invalidVideoId = "64f5bf1345d6e16ab3495710";

      return request(app.getHttpServer())
        .post("/graphql")
        .send({
          operationName: null,
          query: `
              query {
                FindOne(id: "${invalidVideoId}") {
                  _id
                  title
                  description
                  url
                }
              }
            `,
        })
        .expect(200)
        .expect((res) => {
          const { errors } = res.body;
          expect(errors).toBeDefined();
          expect(errors[0].message).toBe("Video Not Found");
        });
    });
  });
  describe("updateVideo mutation", () => {
    it("should update a video with valid data", async () => {
      const updateData = {
        title: "Updated Title",
        description: "Updated Description",
        url: "https://example.com/updated_video.mp4",
      };

      return request(app.getHttpServer())
        .post("/graphql")
        .send({
          operationName: null,
          query: `
              mutation {
                updateVideo(updateVideoInput: {
                  _id: "${Id}",
                  title: "${updateData.title}",
                  description: "${updateData.description}",
                  url: "${updateData.url}"
                }) {
                  _id
                  title
                  description
                  url
                }
              }
            `,
        })
        .expect(200)
        .expect((res) => {
          const { data } = res.body;
          expect(data.updateVideo).toBeDefined();
          expect(data.updateVideo._id).toBe(Id);
          expect(data.updateVideo.title).toBe(updateData.title);
          expect(data.updateVideo.description).toBe(updateData.description);
          expect(data.updateVideo.url).toBe(updateData.url);
        });
    });

    it('should return an "Required fied is missing" error when ID is not provided', async () => {
      // Assuming you have update data but no video ID
      const updateData = {
        title: "Updated Title",
        description: "Updated Description",
        url: "https://example.com/updated_video.mp4",
      };

      return request(app.getHttpServer())
        .post("/graphql")
        .send({
          operationName: null,
          query: `
              mutation {
                updateVideo(updateVideoInput: {
                  _id: "",
                  title: "${updateData.title}",
                  description: "${updateData.description}",
                  url: "${updateData.url}"
                }) {
                  _id
                  title
                  description
                  url
                }
              }
            `,
        })
        .expect(200)
        .expect((res) => {
          const { errors } = res.body;
          expect(errors).toBeDefined();
          expect(errors[0].message).toBe("Required fied is missing");
        });
    });
  });
  describe("deleteVideo mutation", () => {
    it("should delete a video with a valid ID", async () => {

      return request(app.getHttpServer())
        .post("/graphql")
        .send({
          operationName: null,
          query: `
              mutation {
                deleteVideo(id: "${Id}") {
                  _id
                  title
                  description
                  url
                }
              }
            `,
        })
        .expect(200)
        .expect((res) => {
          const { data } = res.body;
          expect(data.deleteVideo).toBeDefined();
          expect(data.deleteVideo._id).toBe(Id);
        });
    });

    it('should return an "" error when ID is not provided', async () => {
      const emptyId = "";

      return request(app.getHttpServer())
        .post("/graphql")
        .send({
          operationName: null,
          query: `
              mutation {
                deleteVideo(id: "${emptyId}") {
                  _id
                  title
                  description
                  url
                }
              }
            `,
        })
        .expect(200)
        .expect((res) => {
          const { errors } = res.body;
          expect(errors).toBeDefined();
          expect(errors[0].message).toBe("Id is missing");
        });
    });
  });
});
