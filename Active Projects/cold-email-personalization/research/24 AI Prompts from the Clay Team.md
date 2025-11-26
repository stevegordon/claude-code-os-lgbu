# 24 AI Prompts from the [Clay.com](http://Clay.com) Team

# **Summarization Prompts**

### **1\. Summarize a Call's Transcript**

1

Markdown

```

Take this and summarize it into a call transcript:
{{transcript}}.

```

### **2\. Summarize LinkedIn Profile and Surface Key Points**

2

Markdown

```

Imagine you are an expert business development representative focused on prospect research.

Based on the Linkedin profile data provided, please identify three unique and noteworthy aspects about the individual.
Consider the professional background, achievements, skills, endorsements, projects, education, and any personal interests or volunteer work mentioned.

Highlight points that distinguish them from others in their field.
Keep each bullet point to 15 words max.

Profile Data: {{Enrich LI Profile}}

Output format:
Unique Aspects:
1.
2.
3.

```

### **3\. Summarize a News Article**

3

Markdown

```

Using the input, complete my prompt using keywords specific to the news article.
Compliment them on the findings of the article. Keep it very short and casual.
Make sure to leave out corporate jargon. Shorten company names when applicable.
Don't make any reference to the time of the article being published.

The input is: {{Headline}} 

Complete this prompt: I saw the recent news article about

```

### **4\. Summarize an Open Job Title and Turn It into an Inferred Problem**

4

Markdown

```

Tell me what problem this company is trying to solve based on the open job that is listed in the input.
Keep it short and be specific based on what that job title is known to be tasked with in a company.

The input is this: {{job title}} 

Complete this prompt: "I saw your company was hiring for a {{job title}}. In my experience this means you're trying to improve the company's"

```

### **5\. Summarize Someone's LinkedIn Post**

5

Markdown

```

Use the input to complete my prompt in under 8 words.
Keep the output short and use specific keywords from the post.
These are social media posts by other people and I would just like to know the main idea of each post.

The input is this: "LinkedIn Post"

Complete this prompt: "I just wanted to reach out because I saw your post about"

```

---

# **Information Extraction Prompts**

### **6\. Determine the Job Title Company Sells To**

6

Markdown

```

Determine the job title this company usually sells to, using the following inputs:
Description of company: {{Description}}
Website of company: {{Website}}

Who gets the most value out of the product and what is their usual job title?
What industry or market does that individual work within?

The output should be 1 simple sentence that looks like this:

Example 1:
Data science leaders in the manufacturing who focus on helping their company adopt Al.

Example 2:
Application security leaders in the software development industry who focus on improving developer security.

```

### **7\. Gather the Coordinates of an Address**

7

Markdown

```

What are the exact coordinates {{result}}?
Output only latitude and longitude number, comma separated.

```

### **8\. Find Company Customers Based on Scraped Data**

8

Markdown

```

I want you to help me output two customers of {{name}} you have found from the input I will give you.
If there are no customers from the page, please return No Customers Found. Please do not output names of people.
Do not add any other words besides the two customer names and "and".
Return the names of customers in a pair separated by an and. Do not add anything else.
There should only be three words in the answer.

Input: {{links}}

```

### **9\. Discover Company Missions**

9

Markdown

```

What is the mission of the company using the input?

The input: "{{LinkedIn Company Description}}" 

Be specific and use keywords in the description not normally found in other companies.
Keep the output under 6 words and make the output conversational/casual.

Complete this prompt: "I was on your LinkedIn company page and it looks you're focused on"

```

### **10\. Discover Who the Company Sells To**

10

Markdown

```

What is the job title that this company usually sells to using the input as a guide for what they do.

The input is this: {{LinkedIn Company Description}} 

Who gets most value out of the product and what is their usual job title?
Give me up to three job titles. Do not include any numbers or extra information.
Just a comma separated list of titles.

```

### **11\. Find the Pricing Terms of the Company**

11

Markdown

```

How much is this company's highest pricing per month using the input. Be as specific and short as possible.
Also tell me if it's monthly or annual pricing. 

The input: [Input from Web Scraping Enrichment (ex. Clay Scrape Website Enrichment)]

```

### **12\. Find the Focus of a Job from Someone's Title**

12

Markdown

```

Tell me what is the focus of this person's role based on the title name and the input.
Be specific and casual. 

The title name is this: {{LinkedIn Job Title}}
The input is this: "{{LinkedIn Summary}}"

Complete this prompt with the tasks they are responsible for in under 6 words. "As the {{title}}, I'd imagine you focus on"

```

### **13\. Infer if a Company Is B2B or B2C**

13

Markdown

```

A B2B company is a company that sells to other companies.
A B2C company is a company that sells to consumers.
Using the input, tell me if the company is likely a B2B company or a B2C company.

The input is this: {{company description}} 

The only acceptable output is either "B2B" or "B2C" do not answer in any other way.

```

### **14\. Categorize Whether a Company Works on SaaS**

14

Markdown

```

Is the company in the input a software as a service company?
A software as a service company is a company that offers a software usually for a monthly or annual description to multiple users providing them with a service.

The input is this: "{{Company description}}" 

Only return a result as "true" if it is a software as a service company or "false" if it is not a software as a service company.

```

### **15\. Infer a Company's Glassdoor Reviews**

15

Markdown

```

Using the input, tell me what is the company review of the company. Only return a numerical value, no words.

the input is: "{{Google snippet}}"

```

### **16\. Understand the Problems a Company Solves**

16

Markdown

```

Answer the questions about the company whose name is {{Company Name}}, company description is this {{description}}.
Use Breadth-first search to explore all potential scenarios before going deeper into specific ones.
Only answer the questions if you have an answer you are 95% sure is correct.
If you don't think it's 95% certain, leave it blank.

1. What is the problem this company solves?
2. Without this company, how are people solving this problem today?
3. What is something new or novel that we can teach the person we are reaching out to? We want to provide them something for free.
4. What is the cost of inaction if they were to stay with their status quo solution?
5. How is the company different from its competitors?

```

### **17\. Normalize a City from Location on LinkedIn**

17

Markdown

```

Extract the city from {{Location}}.
If {{Location}} is just a country, return "No City".

```

### **18\. Return a Timezone Based on the Location**

18

Markdown

```

Return the letter timezone for {{City Response}}, {{Country Response}}.
If there are multiple possible timezones, just return your best guess timezone.
Return only three letter timezone and nothing else.

```

### **19\. Understand the Seniority of a Title**

19

Markdown

```

You will be provided with a job title below and your job is to categorize the job title into one of the following seniority buckets.

• Owner/CXO
• Vice President
• Director
• Manager
• Head
• Senior
• AE (Account Executive)
• SDR/BDR
• RevOps/Sales Ops
• Advisor
• Consultant
• Recruiter
• Growth
• Other

Return only the seniority bucket and nothing else. Only return one seniority.
In cases where multiple could apply, default to the more senior one.
There should be no • in the final output.

The job title is {{job title}}.

```

### **20\. Clean Titles of Contacts**

20

Markdown

```

Please help me clean out the job titles in finance. I just want the current position from this text: {{Title}}.

If there are two positions, please choose the first position.
If there are any abbreviations, please spell them out (ex. SVP is Senior Vice President, CFO is Chief Financial Officer), and make sure to keep the words finance in the role.
For the output, I only want the job title.

```

---

# **Content Generation Prompts21**

### **21\. Write a Bio for an Animal Shelter Cat22**

23

Markdown

```

Start with introduction - It's {{Name}} (don't use "*"). Then, taking into account how I look {{response}}, write fun facts about me.
Don't describe how I look as it is on the photo that is attached.
Focus on my interests and hobbies and my character that should be appropriate for how I look {{Response}}.
Add also some views that I can have on some fun historical events, favorite movies, books, politics, music, fashion, etc.

Make the message less desperate but more fun. Make it 60 words max.
Finish each with the fun - something like "To adopt me, visit my manager or my assistant, or furless manager {{Pet Link}}."

Always include {{Spanish Translations Response}} if contains that I need a companion, another dog, special home, or family with experience and put it in the message if it says that there is a need in another animal, or experienced owner or learning to trust.
Use a few emojis.

```

### **22\. Find a Meme based on the Customer's Problem Statement24**

25

Markdown

```

Choose the best Meme for this case {{Combined Responses}} before coma - first statement.
After comma - second statement.
Output meme name only.
Don't use ////////

```

### **23\. Generate Plant Recommendation Messages**

26

Markdown

```

Generate an email that I'm sending to a farm. It should contain that "According to the weather forecast for the next 14 days in {{Farm Address}}, it might be a perfect time to plant any of {{response}} as it's a good weather condition for these specific plants. 

Choose two or three plants from the list and justify why it's a good time. Use Temperature {{Temperature Conversion}}, pressure {{Pressure}}, Humidity {{Humidity}}, cloud % {{Cloud %}} numbers to support your statement.

If you are interested, we can deliver {{response}} seeds within 2 days and we'll be keeping you posted on the weather conditions and how to take care of your new plants!
Moreover- everything you purchased from us we'll buy it back at market cost!
Take into account {{Rain Classification}}.

```

### **24\. Creative Outreach Message as Advertiser**

27

**Example 1:**

Markdown

```

You are a creative advertiser who has turned into a prospecting expert that works at Clay.com.
Your goal is to write a compelling email that entices the CMO (Chief Marketing Officer) to take a meeting with Clay.com.

The email should be no more than 5 sentences long that are short and no longer than 15 words each.
The email should not be a single paragraph. It should contain an insight and a call to action (that is a question).

The content should include how clay can help {{Company Name}} with a website at {{Company Domain}} reach its buyers who are {{Personas}} working in the industries {{industries}}.
{{Company Name}} aims to provide the following value proposition {{Value Proposition}} to its ICP {{ICP}}.

Be creative how you phrase the call to action

```

**Example 2:**

Markdown

```

The CMO is {{Full Name}} with a LinkedIn profile {{url}} and provides a description about themselves.
Please use this information to make the email feel more personalized to that CMО.
The subject line should be no longer than 5 words.

Compose the email in the style of John Haggert. His writing style is simple, impactful, creative, and focuses on brand differentiation.
His tone is bold, clear, provocative, and confident. Search the web to find more about John Haggert's writing style before composing the email.

Write the email in a conversational way so that it sounds like a human is talking to another human.
The email should not include any variations of the following:
I hope you're doing well
Impressive background
Personalizing based on job change

```

