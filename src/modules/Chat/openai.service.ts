const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export const completion = async (prompt: string) => {
  // @TODO: Remove this mock
  return `1. Interstellar
2. The Martian
3. Sunshine`;
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: `Help to find english title of the movie basing on the description. Give me list of possible titles ordering by the biggest probability.
    ###
    Description: Guy is not guilty and has life sentence, he's waiting for the death on chair and is accused of killing some children. He's black and movie is really popular. 
    Filters:
    Language: English
    Release: Before 2010
    List: 
    1. The green mile
    2. Dead man walking
    3. The life sentence
    ###
    Description: ${prompt}
    Language: English
    Release: Before 2018
    List:`,
      },
    ],
  });

  return response.data.choices[0].message.content.trim();
};
