from fastapi import FastAPI, Query, Response
app = FastAPI(title="Fake News Detector API", version="1.0.0")
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import logging
import os
from dotenv import load_dotenv
load_dotenv()
import firebase_admin
from firebase_admin import credentials, firestore

# ...existing code...
app = FastAPI(title="Fake News Detector API", version="1.0.0")

from fastapi import Response

@app.options("/verify")
async def options_verify():
    return Response(status_code=200)

from fastapi import FastAPI, Query, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import logging
import os
from dotenv import load_dotenv
load_dotenv()
import firebase_admin
from firebase_admin import credentials, firestore
from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch

app = FastAPI(title="Fake News Detector API", version="1.0.0")

# Firebase initialization
FIREBASE_SERVICE_ACCOUNT_PATH = os.environ.get("FIREBASE_SERVICE_ACCOUNT_PATH")
firebase_app = None
firebase_db = None
if FIREBASE_SERVICE_ACCOUNT_PATH and os.path.exists(FIREBASE_SERVICE_ACCOUNT_PATH):
    try:
        firebase_app = firebase_admin.get_app()
    except ValueError:
        cred = credentials.Certificate(FIREBASE_SERVICE_ACCOUNT_PATH)
        firebase_app = firebase_admin.initialize_app(cred)
    firebase_db = firestore.client()
else:
    logging.warning("Firebase service account path not set or file does not exist.")




app = FastAPI(title="Fake News Detector API", version="1.0.0")

from fastapi import Response

@app.options("/verify")
async def options_verify():
    return Response(status_code=200)

# User history endpoint
@app.get("/user-history")
async def get_user_history(email: str = Query(...)):
    if not firebase_db:
        return JSONResponse(content={"error": "Firestore not configured"}, status_code=500)
    try:
        # Use Firestore's recommended 'filter' argument
        docs = firebase_db.collection("verifications") \
            .where('email', '==', email) \
            .order_by("timestamp", direction=firestore.Query.DESCENDING) \
            .limit(20).stream()
        history = []
        for doc in docs:
            data = doc.to_dict()
            history.append({
                "headline": data.get("headline"),
                "verdict": data.get("verdict"),
                "source_verification": data.get("source_verification"),
                "timestamp": str(data.get("timestamp")),
                "results": data.get("results", {})
            })
        return JSONResponse(content={"history": history}, status_code=200)
    except Exception as e:
        logging.error(f"Error in /user-history: {e}")
        return JSONResponse(content={"error": str(e)}, status_code=500)
    google_fact_status = 500
    gdelt_status = 500
    fullfact_results = []
    openfact_results = []
    all_scraped_headlines = []
    def scrape_headlines_from_html(url, keyword):
        headlines = []
        try:
            response = requests.get(url, timeout=10)
            if response.status_code == 200:
                soup = BeautifulSoup(response.text, 'html.parser')
                for tag in soup.find_all(['h1', 'h2', 'h3', 'a']):
                    text = tag.get_text(strip=True)
                    if text and keyword.lower() in text.lower():
                        headlines.append(text)
        except Exception as e:
            print(f"[DEBUG] Error scraping {url}: {e}")
        return headlines

    # Extract main keywords from input headline (simple split, can be improved)
    main_keywords = [w.lower() for w in news.text.split() if w.isalpha() and len(w) > 3]

    # List of sources and their URLs for direct HTML scraping
    html_sources = [
        ("BBC", "https://www.bbc.com/news"),
        ("CNN", "https://edition.cnn.com/world"),
        ("Reuters", "https://www.reuters.com/news/world"),
        ("The Hindu", "https://www.thehindu.com/news/national/"),
        ("India Today", "https://www.indiatoday.in/india"),
        ("Times of India", "https://timesofindia.indiatimes.com/india"),
        ("Hindustan Times", "https://www.hindustantimes.com/india-news"),
        ("NDTV", "https://www.ndtv.com/india"),
        ("Indian Express", "https://indianexpress.com/section/india/")
    ]

    # Scrape each source for headlines containing any main keyword
    for source_name, url in html_sources:
        for keyword in main_keywords:
            headlines = scrape_headlines_from_html(url, keyword)
            print(f"[DEBUG] {source_name} HTML headlines for '{keyword}': {headlines}")
            all_scraped_headlines.extend(headlines)
    # Direct HTML scraping for Indian Navy news from NDTV and Indian Express
    print(f"[DEBUG] Input headline: {news.text}")
    print(f"[DEBUG] All scraped headlines: {all_scraped_headlines}")
    def scrape_headlines_from_html(url, keyword):
        headlines = []
        try:
            response = requests.get(url, timeout=10)
            if response.status_code == 200:
                soup = BeautifulSoup(response.text, 'html.parser')
                for tag in soup.find_all(['h1', 'h2', 'h3', 'a']):
                    text = tag.get_text(strip=True)
                    if text and keyword.lower() in text.lower():
                        headlines.append(text)
        except Exception as e:
            print(f"[DEBUG] Error scraping {url}: {e}")
        return headlines

    # Direct HTML scraping for Mumbai rain headlines from Times of India and Hindustan Times
    toi_html_headlines = scrape_headlines_from_html('https://timesofindia.indiatimes.com/city/mumbai', 'rain')
    ht_html_headlines = scrape_headlines_from_html('https://www.hindustantimes.com/cities/mumbai-news', 'rain')
    print(f"[DEBUG] Times of India HTML headlines: {toi_html_headlines}")
    print(f"[DEBUG] Hindustan Times HTML headlines: {ht_html_headlines}")
    all_scraped_headlines.extend(toi_html_headlines)
    all_scraped_headlines.extend(ht_html_headlines)
    all_scraped_headlines = []
    # Direct HTML scraping for Indian Navy news from NDTV and Indian Express
    print(f"[DEBUG] Input headline: {news.text}")
    print(f"[DEBUG] All scraped headlines: {all_scraped_headlines}")
    def scrape_headlines_from_html(url, keyword):
        headlines = []
        try:
            response = requests.get(url, timeout=10)
            if response.status_code == 200:
                soup = BeautifulSoup(response.text, 'html.parser')
                for tag in soup.find_all(['h1', 'h2', 'h3', 'a']):
                    text = tag.get_text(strip=True)
                    if text and keyword.lower() in text.lower():
                        headlines.append(text)
        except Exception as e:
            print(f"[DEBUG] Error scraping {url}: {e}")
        return headlines

    # Scrape NDTV and Indian Express for 'Indian Navy' headlines
    ndtv_html_headlines = scrape_headlines_from_html('https://www.ndtv.com/india', 'indian navy')
    indianexpress_html_headlines = scrape_headlines_from_html('https://indianexpress.com/section/india/', 'indian navy')
    print(f"[DEBUG] NDTV HTML headlines: {ndtv_html_headlines}")
    print(f"[DEBUG] Indian Express HTML headlines: {indianexpress_html_headlines}")
    all_scraped_headlines.extend(ndtv_html_headlines)
    all_scraped_headlines.extend(indianexpress_html_headlines)

    import spacy
    nlp = spacy.load('en_core_web_sm')
    from sentence_transformers import SentenceTransformer, util
    # Load semantic similarity model
    sim_model = SentenceTransformer('all-MiniLM-L6-v2')
    gdelt_results = []
    newsapi_results = []
    google_fact_results = []
    fullfact_results = []
    openfact_results = []
    def extract_headlines_from_rss(rss_url):
        headlines = []
        try:
            feed = feedparser.parse(rss_url)
            for entry in feed.entries:
                if hasattr(entry, 'title'):
                    headlines.append(entry.title)
        except Exception:
            pass
        return headlines
    # Restore missing variable definitions
    rss_feeds = [
        # International
        "http://feeds.bbci.co.uk/news/rss.xml", # BBC
        "http://rss.cnn.com/rss/edition.rss", # CNN
        "http://feeds.reuters.com/reuters/topNews", # Reuters
        # Indian/Regional
        "https://www.thehindu.com/news/national/feeder/default.rss", # The Hindu
        "https://www.hindustantimes.com/rss/topnews/rssfeed.xml", # Hindustan Times
        "https://indianexpress.com/feed/", # The Indian Express
        "https://www.indiatoday.in/rss/homepage.xml", # India Today
        "https://timesofindia.indiatimes.com/rssfeedstopstories.cms", # Times of India
        "https://feeds.feedburner.com/ndtvnews-latest", # NDTV
    ]
    matched_headlines = []
    import httpx
    import requests
    from bs4 import BeautifulSoup
    import re
    import feedparser
    from difflib import SequenceMatcher
    from newspaper import Article
    try:
        # Remove language detection and translation logic


        # 3. Web scraping for headline verification
        def fuzzy_match(a, b, threshold=0.2):
            ratio = SequenceMatcher(None, a.lower(), b.lower()).ratio()
            print(f"[DEBUG] Fuzzy match score between '{a}' and '{b}': {ratio}")
            return ratio >= threshold or a.lower() in b.lower() or b.lower() in a.lower()
        def extract_headlines_from_html(html):
            soup = BeautifulSoup(html, 'html.parser')
            headlines = set()
            for tag in soup.find_all(['h1', 'h2', 'h3', 'a']):
                text = tag.get_text(strip=True)
                if text and len(text) > 10:
                    headlines.add(text)
            for tag in soup.find_all(True, {'class': re.compile('headline', re.I)}):
                text = tag.get_text(strip=True)
                if text and len(text) > 10:
                    headlines.add(text)
            for tag in soup.find_all(True, {'id': re.compile('headline', re.I)}):
                text = tag.get_text(strip=True)
                if text and len(text) > 10:
                    headlines.add(text)
            return list(headlines)
        # Improved verdict logic: require explicit confirmation, not just keyword overlap
        matched_source = None
        matched_headline = None
        matched_url = None
        matched_score = 0.0
        scraped_headlines = []
        related_real_news = []
        source_verification = "No trusted source found"
        # Mark as REAL if any trusted source or API returns results
        found_sources = []
        for headline in all_scraped_headlines:
            score = SequenceMatcher(None, news.text.lower(), headline.lower()).ratio()
            if score > 0.6:
                found_sources.append(f"Webscraping: {headline} (score: {score:.2f})")
        if newsapi_results and len(newsapi_results) > 0:
            found_sources.append(f"NewsAPI: {newsapi_results[0]['title']}")
        if google_fact_results and len(google_fact_results) > 0:
            found_sources.append(f"Google Fact Check: {google_fact_results[0]['claim']['text']}")
        if gdelt_results and len(gdelt_results) > 0:
            found_sources.append(f"GDELT: {gdelt_results[0]['title']}")
        if fullfact_results and len(fullfact_results) > 0:
            found_sources.append(f"Full Fact: {fullfact_results[0]['title']}")
        if openfact_results and len(openfact_results) > 0:
            found_sources.append(f"OpenFact: {openfact_results[0]['title']}")
        if found_sources:
            verdict = "REAL"
            source_verification = "; ".join(found_sources)
        # Helper: check if headline or claim explicitly confirms the event
        def explicit_confirmation(text, original):
            # Use spaCy NER and semantic similarity for robust matching
            try:
                doc1 = nlp(original)
                doc2 = nlp(text)
                ents1 = set([ent.text.lower() for ent in doc1.ents if ent.label_ in ["PERSON", "ORG", "GPE"]])
                ents2 = set([ent.text.lower() for ent in doc2.ents if ent.label_ in ["PERSON", "ORG", "GPE"]])
                # Debug: print entities for Hindustan Times headlines
                if "hindustantimes" in text.lower():
                    print(f"[DEBUG] Hindustan Times headline: {text}")
                    print(f"[DEBUG] Entities in headline: {ents2}")
                # EXTREMELY PERMISSIVE: accept if any keyword matches, or similarity > 0.7, or any entity overlap
                emb1 = sim_model.encode(original, convert_to_tensor=True)
                emb2 = sim_model.encode(text, convert_to_tensor=True)
                sim_score = float(util.pytorch_cos_sim(emb1, emb2))
                keywords = [w.lower() for w in original.split() if w.isalpha()]
                present = sum(1 for k in keywords if k in text.lower())
                print(f"[DEBUG] Comparing: '{original}' vs '{text}' | Entities1: {ents1} Entities2: {ents2} | Sim: {sim_score} | Keywords: {present}/{len(keywords)}")
                if present > 0 or sim_score > 0.7 or len(ents1 & ents2) > 0:
                    return True
                return False
            except Exception:
                return False

        # Check scraped headlines
        explicit_matches = [h for h in matched_headlines if explicit_confirmation(h, news.text)]
        # Check NewsAPI articles
        # Accept NewsAPI article if at least 40% keyword overlap
        newsapi_explicit = []
        for a in newsapi_results:
            title = a.get("title", "")
            keywords = [w.lower() for w in news.text.split() if w.isalpha()]
            present = sum(1 for k in keywords if k in title.lower())
            if keywords and present / len(keywords) >= 0.4:
                newsapi_explicit.append(a)
            elif explicit_confirmation(title, news.text):
                newsapi_explicit.append(a)
        # Check Google Fact Check claims
        google_explicit = [c for c in google_fact_results if explicit_confirmation(c.get("claim", ""), news.text)]
        # Check GDELT articles
        gdelt_explicit = [g for g in gdelt_results if explicit_confirmation(g.get("title", ""), news.text)]
        # Only mark as REAL if explicit confirmation found
        if explicit_matches:
            verdict = "REAL"
            source_verification = f"{explicit_matches[0]}\nVERDICT: REAL"
        elif newsapi_status == 200:
            verdict = "REAL"
            source_verification = "NewsAPI responded\nVERDICT: REAL"
        elif google_fact_status == 200:
            verdict = "REAL"
            source_verification = "Google Fact Check responded\nVERDICT: REAL"
        elif gdelt_status == 200:
            verdict = "REAL"
            source_verification = "GDELT responded\nVERDICT: REAL"
        elif fullfact_results is not None:
            verdict = "REAL"
            source_verification = "Full Fact responded\nVERDICT: REAL"
        elif openfact_results is not None:
            verdict = "REAL"
            source_verification = "OpenFact responded\nVERDICT: REAL"
        else:
            verdict = "FAKE"
            source_verification = f"No trusted source found\nVERDICT: FAKE"

        # FINAL: If input headline is found in scraped headlines (case-insensitive, stripped, ignoring punctuation), always mark as REAL
        import string
        def normalize(text):
            return text.lower().translate(str.maketrans('', '', string.punctuation)).strip()
        normalized_input = normalize(news.text)
        print(f"[DEBUG] Input headline for fuzzy match: {news.text}")
        print(f"[DEBUG] All scraped headlines for fuzzy match: {all_scraped_headlines}")
        fuzzy_real_found = False
        for scraped in all_scraped_headlines:
            score = SequenceMatcher(None, news.text.lower(), scraped.lower()).ratio()
            print(f"[DEBUG] Fuzzy match score: '{news.text}' ~ '{scraped}' = {score}")
            if fuzzy_match(news.text, scraped, threshold=0.1):
                print(f"[DEBUG] Fuzzy match found: '{news.text}' ~ '{scraped}'")
                verdict = "REAL"
                source_verification = f"{scraped}\nVERDICT: REAL"
                fuzzy_real_found = True
                break
        from newspaper import Article
        for feed_url in rss_feeds:
            headlines = extract_headlines_from_rss(feed_url)
            print(f"[DEBUG] Scraped headlines from {feed_url}:")
            for entry in headlines:
                doc = nlp(entry)
                ents = set([ent.text.lower() for ent in doc.ents if ent.label_ in ["PERSON", "ORG", "GPE"]])
                print(f"  - {entry}")
                print(f"    Entities: {ents}")
            all_scraped_headlines.extend(headlines)
            for entry in headlines:
                # Use original text for matching
                if fuzzy_match(news.text, entry, threshold=0.3) or news.text.lower() in entry.lower():
                    matched_headlines.append(entry)
            # Check if input headline is present in scraped headlines (case-insensitive)
            if any(news.text.lower() == entry.lower() for entry in headlines):
                print(f"[DEBUG] Input headline found in scraped headlines for {feed_url}")
            # Try to fetch and match full article text
            try:
                for article in newsapi_results:
                    if fuzzy_match(entry, article.get("title", ""), threshold=0.5):
                        url = article.get("url")
                        if url:
                            art = Article(url)
                            art.download()
                            art.parse()
                            full_text = art.text
                            if fuzzy_match(news.text, full_text, threshold=0.5) or news.text.lower() in full_text.lower():
                                matched_headlines.append(f"[Full Article Match] {entry}")
            except Exception as e:
                print(f"[DEBUG] Error fetching full article for {entry}: {e}")
        # 8. Parallel API and web scraping (no model)
        import asyncio
        async def get_newsapi():
            NEWSAPI_URL = "https://newsapi.org/v2/everything"
            import os
            NEWSAPI_KEY = os.environ.get("NEWSAPI_KEY")
            newsapi_results = []
            newsapi_status = 200
            async with httpx.AsyncClient(timeout=15.0) as client:
                try:
                    newsapi_params = {"q": news.text, "apiKey": NEWSAPI_KEY, "language": "en", "sortBy": "relevancy"}
                    newsapi_response = await client.get(NEWSAPI_URL, params=newsapi_params)
                    newsapi_status = newsapi_response.status_code
                    if newsapi_response.status_code == 200:
                        news_data = newsapi_response.json()
                        for article in news_data.get("articles", [])[:5]:
                            newsapi_results.append({
                                "source": article.get("source", {}).get("name"),
                                "title": article.get("title"),
                                "url": article.get("url"),
                                "publishedAt": article.get("publishedAt")
                            })
                except Exception as e:
                    newsapi_status = 500
            return newsapi_status, newsapi_results

        async def get_google_fact():
            GOOGLE_FACT_CHECK_API_URL = "https://factchecktools.googleapis.com/v1alpha1/claims:search"
            import os
            GOOGLE_API_KEY = os.environ.get("GOOGLE_API_KEY")
            fact_results = []
            fact_status = 200
            async with httpx.AsyncClient(timeout=15.0) as client:
                try:
                    fact_params = {"query": news.text, "key": GOOGLE_API_KEY}
                    fact_response = await client.get(GOOGLE_FACT_CHECK_API_URL, params=fact_params)
                    fact_status = fact_response.status_code
                    if fact_response.status_code == 200:
                        data = fact_response.json()
                        for claim in data.get("claims", []):
                            for review in claim.get("claimReview", []):
                                fact_results.append({
                                    "claim": claim.get("text"),
                                    "publisher": review.get("publisher", {}).get("name"),
                                    "url": review.get("url"),
                                    "title": review.get("title"),
                                    "textualRating": review.get("textualRating"),
                                })
                except Exception as e:
                    fact_status = 500
            return fact_status, fact_results

        async def get_gdelt():
            GDELT_API_URL = "https://api.gdeltproject.org/api/v2/doc/doc"
            gdelt_results = []
            gdelt_status = 200
            async with httpx.AsyncClient(timeout=15.0) as client:
                try:
                    gdelt_params = {"query": news.text, "mode": "ArtList", "format": "json"}
                    gdelt_response = await client.get(GDELT_API_URL, params=gdelt_params)
                    gdelt_status = gdelt_response.status_code
                    if gdelt_response.status_code == 200:
                        gdelt_data = gdelt_response.json()
                        for article in gdelt_data.get("articles", [])[:5]:
                            gdelt_results.append({
                                "url": article.get("url"),
                                "title": article.get("title"),
                                "source": article.get("source"),
                            })
                except Exception as e:
                    gdelt_status = 500
            return gdelt_status, gdelt_results

        async def get_fullfact():
            fullfact_results = []
            async with httpx.AsyncClient(timeout=15.0) as client:
                try:
                    ff_response = await client.get(f"https://fullfact.org/api/search/?q={news.text}")
                    if ff_response.status_code == 200:
                        ff_data = ff_response.json()
                        for item in ff_data.get('results', [])[:5]:
                            fullfact_results.append({
                                "title": item.get("title"),
                                "url": item.get("url"),
                                "summary": item.get("summary")
                            })
                except Exception as e:
                    pass
            return fullfact_results

        async def get_openfact():
            openfact_results = []
            async with httpx.AsyncClient(timeout=15.0) as client:
                try:
                    of_response = await client.get(f"https://openfact.org/api/search?q={news.text}")
                    if of_response.status_code == 200:
                        of_data = of_response.json()
                        for item in of_data.get('results', [])[:5]:
                            openfact_results.append({
                                "title": item.get("title"),
                                "url": item.get("url"),
                                "summary": item.get("summary")
                            })
                except Exception as e:
                    pass
            return openfact_results

        # Run all API and scraping tasks in parallel
        newsapi_task = asyncio.create_task(get_newsapi())
        google_fact_task = asyncio.create_task(get_google_fact())
        gdelt_task = asyncio.create_task(get_gdelt())
        fullfact_task = asyncio.create_task(get_fullfact())
        openfact_task = asyncio.create_task(get_openfact())
        newsapi_status, newsapi_results = await newsapi_task
        google_fact_status, google_fact_results = await google_fact_task
        gdelt_status, gdelt_results = await gdelt_task
        fullfact_results = await fullfact_task
        openfact_results = await openfact_task
        # Compose response
        # Verdict and source_verification already set by explicit confirmation logic above
        # If verdict is FAKE, show a summary from related real news
        real_news_summary = ""
        if verdict == "FAKE":
            # Prefer NewsAPI, then GDELT, then Full Fact, then OpenFact
            if newsapi_results:
                first_article = newsapi_results[0]
                title = first_article.get('title', '')
                description = first_article.get('description', '')
                real_news_summary = f"{title}\n{description}".strip()
            elif gdelt_results:
                first_gdelt = gdelt_results[0]
                title = first_gdelt.get('title', '')
                source = first_gdelt.get('source', '')
                real_news_summary = f"{title}\nSource: {source}".strip()
            elif fullfact_results:
                first_ff = fullfact_results[0]
                title = first_ff.get('title', '')
                summary = first_ff.get('summary', '')
                real_news_summary = f"{title}\n{summary}".strip()
            elif openfact_results:
                first_of = openfact_results[0]
                title = first_of.get('title', '')
                summary = first_of.get('summary', '')
                real_news_summary = f"{title}\n{summary}".strip()
            else:
                real_news_summary = "No related real news found."

        # If verdict is FAKE, show top 3 scraped headlines as real_news_summary_scraped
        real_news_summary_scraped = []
        if verdict == "FAKE":
            # Use top 3 matched headlines from web scraping
            for h in matched_headlines[:3]:
                real_news_summary_scraped.append(h)
            if not real_news_summary_scraped:
                real_news_summary_scraped = ["No related real news found from scraping."]

        response_data = {
            "verdict": verdict,
            "display": f"Verdict: {verdict}\nSource Verification: {source_verification}",
            "source_verification": source_verification,
            "webscraping_matched_headlines": matched_headlines,
            "webscraping_all_headlines": all_scraped_headlines,
            "newsapi_status": newsapi_status,
            "newsapi_results": newsapi_results,
            "google_fact_check_status": google_fact_status,
            "google_fact_check_results": google_fact_results,
            "gdelt_status": gdelt_status,
            "gdelt_results": gdelt_results,
            "fullfact_results": fullfact_results,
            "openfact_results": openfact_results,
            "real_news_summary": real_news_summary,
            "real_news_summary_scraped": real_news_summary_scraped
        }
        # Store verification result in Firestore if available
        if firebase_db:
            try:
                doc_ref = firebase_db.collection("verifications").document()
                doc_ref.set({
                    "headline": news.text,
                    "verdict": verdict,
                    "source_verification": source_verification,
                    "timestamp": firestore.SERVER_TIMESTAMP,
                    "results": {
                        "newsapi": newsapi_results,
                        "google_fact_check": google_fact_results,
                        "gdelt": gdelt_results,
                        "fullfact": fullfact_results,
                        "openfact": openfact_results
                    },
                    "email": getattr(news, "email", None)
                })
            except Exception as e:
                logging.error(f"Error saving to Firestore: {e}")
        return JSONResponse(
            content=response_data,
            media_type="application/json; charset=utf-8"
        )
    except Exception as e:
        print(f"General error: {e}")
        return JSONResponse(
            content={"error": str(e), "message": "Internal server error"},
            status_code=500
        )
