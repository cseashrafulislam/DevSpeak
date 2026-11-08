// Independent, authored AI curriculum. Existing English roadmap/data are not modified.
export const AI_PHASES = [
  {
    "name": "AI Foundations & Data",
    "bn": "AI, C#, Python, Math, SQL",
    "range": "Days 1–30",
    "icon": "◈",
    "goal": "Build a trustworthy ERP data baseline.",
    "project": "Farm Production Analytics"
  },
  {
    "name": "Practical Machine Learning",
    "bn": "Statistics, ML.NET, prediction",
    "range": "Days 31–60",
    "icon": "▥",
    "goal": "Train and evaluate prediction models against baselines.",
    "project": "Stock & Sales Forecast"
  },
  {
    "name": "Deep Learning & NLP",
    "bn": "PyTorch, vision, text, transformers",
    "range": "Days 61–90",
    "icon": "⌘",
    "goal": "Understand neural networks and prototype text/image classifiers.",
    "project": "Support Ticket Classifier"
  },
  {
    "name": "LLMs, RAG & Agents",
    "bn": "C# APIs, retrieval, tool calling",
    "range": "Days 91–120",
    "icon": "◇",
    "goal": "Build a safe citation-backed assistant without free-form SQL execution.",
    "project": "AI ERP Knowledge Assistant"
  },
  {
    "name": "Voice, OCR & Local AI",
    "bn": "Bangla speech, documents, multimodal",
    "range": "Days 121–150",
    "icon": "🎙",
    "goal": "Capture speech/documents into structured, reviewable ERP drafts.",
    "project": "Voice Entry & Invoice Reader"
  },
  {
    "name": "Production AI Engineering",
    "bn": "Evaluation, tenancy, security, deployment",
    "range": "Days 151–180",
    "icon": "⚙",
    "goal": "Deploy and monitor a secure AI-enabled modular ERP.",
    "project": "Technovate AI ERP Capstone"
  }
];
export const AI_DAYS = [
  {
    "day": 1,
    "phase": 0,
    "title": "AI vs automation",
    "concept": "Define rules, machine learning, generative models and agents with ERP examples",
    "lab": "Write C# three-day moving-average milk forecast and compare to a rule-based alert",
    "evidence": "Print next-day forecast and prove baseline is not a trained model"
  },
  {
    "day": 2,
    "phase": 0,
    "title": "Problem framing",
    "concept": "Define a business question, label, data source and success metric",
    "lab": "Write an input/label contract for cow milk production",
    "evidence": "Problem statement with exact target and date window"
  },
  {
    "day": 3,
    "phase": 0,
    "title": "Data and labels",
    "concept": "Identify categorical, numeric and text fields in ERP",
    "lab": "Define C# ProductionExample with decimal Quantity and stable AnimalId",
    "evidence": "Annotated sample of ten valid records"
  },
  {
    "day": 4,
    "phase": 0,
    "title": "AI project lifecycle",
    "concept": "Learn collect, clean, train, evaluate, deploy and monitor",
    "lab": "Represent lifecycle as C# enum with allowed transitions",
    "evidence": "Reproducible project checklist"
  },
  {
    "day": 5,
    "phase": 0,
    "title": "Development environment",
    "concept": "Install .NET SDK, Python venv, Git and editor",
    "lab": "Create a .NET console app and a Python hello-world script",
    "evidence": "Version manifest and both programs run"
  },
  {
    "day": 6,
    "phase": 0,
    "title": "Data validation",
    "concept": "Understand nulls, units, negative numbers and data ownership",
    "lab": "Write validation rules for quantities, dates and unit IDs",
    "evidence": "Six rejected examples with reasons"
  },
  {
    "day": 7,
    "phase": 0,
    "title": "SQL tenant filters",
    "concept": "Practice parameterized SQL, date ranges and company scope",
    "lab": "Write a SQL query for daily production using @CompanyInfoId",
    "evidence": "No cross-company rows"
  },
  {
    "day": 8,
    "phase": 0,
    "title": "SQL joins",
    "concept": "Understand grain, joins, GROUP BY and duplicate aggregation",
    "lab": "Aggregate daily output by project and animal without duplicate joins",
    "evidence": "Two reconciled totals"
  },
  {
    "day": 9,
    "phase": 0,
    "title": "C# decimal and DTOs",
    "concept": "Model money/quantity with decimal, not float",
    "lab": "Create DTO and test overflow, invalid IDs and negative quantity",
    "evidence": "Reliable validation errors"
  },
  {
    "day": 10,
    "phase": 0,
    "title": "Statistics",
    "concept": "Learn mean, median, range and dispersion",
    "lab": "Calculate descriptive statistics in C# LINQ",
    "evidence": "Table of summary metrics"
  },
  {
    "day": 11,
    "phase": 0,
    "title": "Probability",
    "concept": "Interpret probability, base rates and conditional events",
    "lab": "Compute observed low-stock days divided by eligible days",
    "evidence": "Explain uncertainty without claiming certainty"
  },
  {
    "day": 12,
    "phase": 0,
    "title": "Vectors and dot products",
    "concept": "Learn feature vectors, dimensions and multiplication",
    "lab": "Implement dot product and reject mismatched lengths",
    "evidence": "Correct result for known vectors"
  },
  {
    "day": 13,
    "phase": 0,
    "title": "Python syntax",
    "concept": "Learn lists, functions, dicts, files and exceptions",
    "lab": "Clean five synthetic invoice rows using Python",
    "evidence": "Saved CSV and error list"
  },
  {
    "day": 14,
    "phase": 0,
    "title": "Pandas DataFrame",
    "concept": "Inspect types, missingness and filtering",
    "lab": "Load production CSV, convert date and check nulls",
    "evidence": "Profile with row counts"
  },
  {
    "day": 15,
    "phase": 0,
    "title": "NumPy",
    "concept": "Understand numeric arrays and vectorization",
    "lab": "Calculate unit-adjusted feed quantity arrays",
    "evidence": "Match manual totals"
  },
  {
    "day": 16,
    "phase": 0,
    "title": "Charts",
    "concept": "Choose line, bar, histogram and scatter charts",
    "lab": "Plot milk production by date with labeled axes",
    "evidence": "Readable figure and explanation"
  },
  {
    "day": 17,
    "phase": 0,
    "title": "Data leakage",
    "concept": "Know what must never enter training features",
    "lab": "Demonstrate leakage from future production and remove it",
    "evidence": "Leakage checklist"
  },
  {
    "day": 18,
    "phase": 0,
    "title": "Temporal splitting",
    "concept": "Train, validate and test chronologically",
    "lab": "Split 100 daily rows into earlier training and later test",
    "evidence": "No overlapping date windows"
  },
  {
    "day": 19,
    "phase": 0,
    "title": "Error metrics",
    "concept": "Compare MAE, RMSE and classification metrics",
    "lab": "Implement MAE helper in C# with unit tests",
    "evidence": "Numeric output verified by hand"
  },
  {
    "day": 20,
    "phase": 0,
    "title": "Baseline comparison",
    "concept": "Compare last-value and rolling-average forecast",
    "lab": "Backtest both against same held-out dates",
    "evidence": "Best baseline chosen by MAE"
  },
  {
    "day": 21,
    "phase": 0,
    "title": "Experiment logging",
    "concept": "Track seed, data version, algorithm and metrics",
    "lab": "Write an experiment JSON manifest",
    "evidence": "Two reproducible runs"
  },
  {
    "day": 22,
    "phase": 0,
    "title": "Testing",
    "concept": "Learn unit, integration and data contract tests",
    "lab": "Test empty datasets, duplicate dates and null input",
    "evidence": "Passing edge-case suite"
  },
  {
    "day": 23,
    "phase": 0,
    "title": "Privacy",
    "concept": "Identify PII, secrets and sensitive financial fields",
    "lab": "Redact example phone and account tokens from logs",
    "evidence": "No sensitive values in logs"
  },
  {
    "day": 24,
    "phase": 0,
    "title": "SQL injection",
    "concept": "Understand parameters, authorization and IDOR",
    "lab": "Replace concatenated SQL with parameters and company authorization",
    "evidence": "Cross-tenant request denied"
  },
  {
    "day": 25,
    "phase": 0,
    "title": "Design decisions",
    "concept": "Write architecture decisions and explicit assumptions",
    "lab": "Draft ADR choosing ML vs deterministic reporting",
    "evidence": "One-page decision with tradeoffs"
  },
  {
    "day": 26,
    "phase": 0,
    "title": "Feature engineering",
    "concept": "Create lag, rolling average and categorical features",
    "lab": "Build day-of-week and rolling production features",
    "evidence": "Feature table free from future data"
  },
  {
    "day": 27,
    "phase": 0,
    "title": "Synthetic dataset",
    "concept": "Create shareable data without leaking real customers",
    "lab": "Generate 100 deterministic production records",
    "evidence": "Data dictionary and CSV"
  },
  {
    "day": 28,
    "phase": 0,
    "title": "Data profiling",
    "concept": "Inspect duplicates, outliers and missing dates",
    "lab": "Create CLI audit on synthetic farm data",
    "evidence": "Quality report with anomaly examples"
  },
  {
    "day": 29,
    "phase": 0,
    "title": "Review and QA",
    "concept": "Reconcile source totals with transformed data",
    "lab": "Test summary and forecast input integrity",
    "evidence": "Repeatable test command"
  },
  {
    "day": 30,
    "phase": 0,
    "title": "Capstone 1",
    "concept": "Package basic analytics and baseline into one deliverable",
    "lab": "Create Farm Analytics console app with README and tests",
    "evidence": "Working baseline, chart, report and limitations"
  },
  {
    "day": 31,
    "phase": 1,
    "title": "ML.NET orientation",
    "concept": "Learn estimators, transforms and trainers in the .NET ecosystem",
    "lab": "Create .NET console app with Microsoft.ML package",
    "evidence": "Versioned environment runs"
  },
  {
    "day": 32,
    "phase": 1,
    "title": "Labels and features",
    "concept": "Separate prediction target from input features",
    "lab": "Define strongly typed stock-demand model classes",
    "evidence": "Feature schema reviewed"
  },
  {
    "day": 33,
    "phase": 1,
    "title": "Regression",
    "concept": "Predict continuous demand and understand residuals",
    "lab": "Train a tiny synthetic regression model in ML.NET",
    "evidence": "Model predicts quantity"
  },
  {
    "day": 34,
    "phase": 1,
    "title": "Classification",
    "concept": "Predict low-stock yes/no with class imbalance",
    "lab": "Train binary classifier from synthetic inventory events",
    "evidence": "Confusion matrix"
  },
  {
    "day": 35,
    "phase": 1,
    "title": "Preprocessing",
    "concept": "Encode categories and normalize only when appropriate",
    "lab": "Add categorical item-group encoding to pipeline",
    "evidence": "Inspect transformed columns"
  },
  {
    "day": 36,
    "phase": 1,
    "title": "ML pipelines",
    "concept": "Compose preparation and training in one reproducible pipeline",
    "lab": "Fit ML.NET pipeline with fixed random seed",
    "evidence": "Repeatable output"
  },
  {
    "day": 37,
    "phase": 1,
    "title": "Regression metrics",
    "concept": "Compare MAE, RMSE, R² and business impact",
    "lab": "Calculate holdout metrics on two candidate models",
    "evidence": "Evidence-based model choice"
  },
  {
    "day": 38,
    "phase": 1,
    "title": "Temporal validation",
    "concept": "Avoid accidental future-data training",
    "lab": "Split demand history by a fixed cutoff",
    "evidence": "Train ends before test starts"
  },
  {
    "day": 39,
    "phase": 1,
    "title": "Cross-validation",
    "concept": "Know when K-fold is invalid for time series",
    "lab": "Compare random K-fold with chronological backtest",
    "evidence": "Correct validation strategy"
  },
  {
    "day": 40,
    "phase": 1,
    "title": "Scaling and outliers",
    "concept": "Understand sensitivity of different algorithms",
    "lab": "Compare raw and scaled feature training",
    "evidence": "Metric comparison"
  },
  {
    "day": 41,
    "phase": 1,
    "title": "Bias and variance",
    "concept": "Understand underfitting, overfitting and model capacity",
    "lab": "Train simple versus complex model",
    "evidence": "Training and validation gap"
  },
  {
    "day": 42,
    "phase": 1,
    "title": "Hyperparameter tuning",
    "concept": "Change model settings without contaminating test",
    "lab": "Log small tuning grid on validation set",
    "evidence": "Best config from validation only"
  },
  {
    "day": 43,
    "phase": 1,
    "title": "Feature importance",
    "concept": "Interpret model drivers cautiously",
    "lab": "Inspect item group, lag quantity and day-of-week influence",
    "evidence": "Suspicious features flagged"
  },
  {
    "day": 44,
    "phase": 1,
    "title": "Missing values",
    "concept": "Choose reject, impute or missing-flag policy",
    "lab": "Benchmark two imputation strategies",
    "evidence": "Metric and missing-rate comparison"
  },
  {
    "day": 45,
    "phase": 1,
    "title": "Anomaly detection",
    "concept": "Identify unusual stock movements versus natural seasonality",
    "lab": "Run ML.NET anomaly experiment on sales series",
    "evidence": "Reviewed anomaly report"
  },
  {
    "day": 46,
    "phase": 1,
    "title": "Class imbalance",
    "concept": "Choose thresholds from cost of false alarms",
    "lab": "Change stockout classifier decision threshold",
    "evidence": "Precision/recall table"
  },
  {
    "day": 47,
    "phase": 1,
    "title": "Save and load model",
    "concept": "Version trained artifact and input schema",
    "lab": "Serialize ML.NET model, then load in fresh process",
    "evidence": "Identical predictions after reload"
  },
  {
    "day": 48,
    "phase": 1,
    "title": "ASP.NET inference",
    "concept": "Expose model behind validated API, not database writes",
    "lab": "Create POST /predict with DTO validation",
    "evidence": "400 for invalid request and JSON for valid"
  },
  {
    "day": 49,
    "phase": 1,
    "title": "Concurrency",
    "concept": "Avoid unsafe shared prediction-engine state",
    "lab": "Benchmark concurrent prediction requests",
    "evidence": "No data race or memory leak"
  },
  {
    "day": 50,
    "phase": 1,
    "title": "Model versions",
    "concept": "Trace each result to dataset and model version",
    "lab": "Add model manifest with SHA and training cutoff",
    "evidence": "Auditable prediction"
  },
  {
    "day": 51,
    "phase": 1,
    "title": "SQL feature source",
    "concept": "Use set-based indexed queries, no GetAll filtering",
    "lab": "Query bounded company-and-date rows for features",
    "evidence": "SQL plan and row limit"
  },
  {
    "day": 52,
    "phase": 1,
    "title": "Per-company evaluation",
    "concept": "Never assume one tenant performs like all others",
    "lab": "Calculate holdout error by company and item group",
    "evidence": "Worst-case groups identified"
  },
  {
    "day": 53,
    "phase": 1,
    "title": "Drift detection",
    "concept": "Understand data distribution change over time",
    "lab": "Compare current versus historical demand features",
    "evidence": "Defined drift alert"
  },
  {
    "day": 54,
    "phase": 1,
    "title": "Uncertainty",
    "concept": "Avoid fabricated confidence percentages",
    "lab": "Display forecast with MAE and baseline",
    "evidence": "Clear explanation of model limitations"
  },
  {
    "day": 55,
    "phase": 1,
    "title": "Scheduled jobs",
    "concept": "Make retraining idempotent and observable",
    "lab": "Simulate repeated training with same dataset hash",
    "evidence": "One model version per configuration"
  },
  {
    "day": 56,
    "phase": 1,
    "title": "Weekly demand forecast",
    "concept": "Apply rolling-window features to product quantities",
    "lab": "Train and backtest weekly sales prediction",
    "evidence": "Weekly forecast plus error metric"
  },
  {
    "day": 57,
    "phase": 1,
    "title": "Reorder suggestion",
    "concept": "Distinguish prediction from business decision",
    "lab": "Apply approved reorder formula to predicted demand",
    "evidence": "Suggestion only, no stock posting"
  },
  {
    "day": 58,
    "phase": 1,
    "title": "Baseline challenge",
    "concept": "Require improvement over trivial models",
    "lab": "Compare ML.NET model against rolling average on two periods",
    "evidence": "Release criterion"
  },
  {
    "day": 59,
    "phase": 1,
    "title": "Prediction QA",
    "concept": "Check null, unknown items, negative and concurrent input",
    "lab": "Add API and model unit tests",
    "evidence": "Passing regression suite"
  },
  {
    "day": 60,
    "phase": 1,
    "title": "Capstone 2",
    "concept": "Finish and document Sales/Stock predictor",
    "lab": "Package ML.NET model, ASP.NET API and report",
    "evidence": "Stock Forecast v1 with version and metrics"
  },
  {
    "day": 61,
    "phase": 2,
    "title": "Neural networks",
    "concept": "Understand weights, activation and gradient descent",
    "lab": "Code a tiny two-input neuron in Python",
    "evidence": "Explain prediction formula"
  },
  {
    "day": 62,
    "phase": 2,
    "title": "Python research tooling",
    "concept": "Learn virtual environment, notebooks and deterministic scripts",
    "lab": "Set up PyTorch training script with a seed",
    "evidence": "Reproducible run"
  },
  {
    "day": 63,
    "phase": 2,
    "title": "Tensors",
    "concept": "Explore shapes, dtype and device allocation",
    "lab": "Create tensors for batch, feature and label",
    "evidence": "Shape assertions pass"
  },
  {
    "day": 64,
    "phase": 2,
    "title": "Autograd",
    "concept": "Understand automatic derivatives",
    "lab": "Differentiate x*x+2*x with PyTorch",
    "evidence": "Compare gradient against manual math"
  },
  {
    "day": 65,
    "phase": 2,
    "title": "Loss functions",
    "concept": "Compare MSE and cross entropy for correct tasks",
    "lab": "Calculate both losses on toy data",
    "evidence": "Explain which fits regression"
  },
  {
    "day": 66,
    "phase": 2,
    "title": "Optimization",
    "concept": "Learn SGD, Adam and learning-rate sensitivity",
    "lab": "Optimize scalar parameter toward a target",
    "evidence": "Loss decreases"
  },
  {
    "day": 67,
    "phase": 2,
    "title": "Training loops",
    "concept": "Separate training and evaluation modes",
    "lab": "Write epoch loop and validation metrics",
    "evidence": "Save best checkpoint"
  },
  {
    "day": 68,
    "phase": 2,
    "title": "Overfitting",
    "concept": "Recognize widening validation gap",
    "lab": "Compare two network sizes on small dataset",
    "evidence": "Train/validation plot"
  },
  {
    "day": 69,
    "phase": 2,
    "title": "Batches",
    "concept": "Learn Dataset, DataLoader, shuffling and workers",
    "lab": "Run batch training with all examples counted",
    "evidence": "No missing samples"
  },
  {
    "day": 70,
    "phase": 2,
    "title": "Network metrics",
    "concept": "Evaluate per-class precision and recall",
    "lab": "Build small confusion-matrix function",
    "evidence": "Minority-class performance reported"
  },
  {
    "day": 71,
    "phase": 2,
    "title": "Embeddings",
    "concept": "Represent semantic text as numeric vectors",
    "lab": "Measure cosine similarity across sample text vectors",
    "evidence": "Rank three sentences"
  },
  {
    "day": 72,
    "phase": 2,
    "title": "Tokenization",
    "concept": "Understand text tokens, context and multilingual splits",
    "lab": "Inspect Bangla and English tokenizer outputs",
    "evidence": "Token counts compared"
  },
  {
    "day": 73,
    "phase": 2,
    "title": "Text normalization",
    "concept": "Preserve Bangla meaning while normalizing Unicode",
    "lab": "Clean mixed Bangla-English support tickets",
    "evidence": "Original and normalized records"
  },
  {
    "day": 74,
    "phase": 2,
    "title": "NLP classification",
    "concept": "Compare bag-of-words baseline to neural model",
    "lab": "Train support ticket category classifier",
    "evidence": "Macro F1 and confusion matrix"
  },
  {
    "day": 75,
    "phase": 2,
    "title": "Sequence models",
    "concept": "Understand RNN/LSTM concepts and limits",
    "lab": "Trace a sequence input through recurrent state",
    "evidence": "Document sequence tradeoff"
  },
  {
    "day": 76,
    "phase": 2,
    "title": "Attention",
    "concept": "Understand query, key, value and weights",
    "lab": "Implement scaled dot-product attention with NumPy",
    "evidence": "Attention weights sum to one"
  },
  {
    "day": 77,
    "phase": 2,
    "title": "Transformers",
    "concept": "Learn attention blocks, residuals and positional signals",
    "lab": "Draw transformer data flow for text prediction",
    "evidence": "Architecture explanation"
  },
  {
    "day": 78,
    "phase": 2,
    "title": "Pretrained models",
    "concept": "Use existing licensed model before training from scratch",
    "lab": "Run local inference on known text sample",
    "evidence": "Model version and license log"
  },
  {
    "day": 79,
    "phase": 2,
    "title": "Fine-tuning data",
    "concept": "Label data, split correctly and avoid duplicates",
    "lab": "Prepare small synthetic support-ticket train/valid sets",
    "evidence": "No leakage across sets"
  },
  {
    "day": 80,
    "phase": 2,
    "title": "Fine-tuning risks",
    "concept": "Understand cost, overfit and privacy leakage",
    "lab": "Compare prompt/RAG/fine-tune choices for ERP",
    "evidence": "Decision table"
  },
  {
    "day": 81,
    "phase": 2,
    "title": "Image basics",
    "concept": "Learn pixels, resizing, aspect ratio and color",
    "lab": "Preprocess invoice image safely",
    "evidence": "Dimension and quality report"
  },
  {
    "day": 82,
    "phase": 2,
    "title": "Image classification",
    "concept": "Distinguish class label from bounding box",
    "lab": "Run pretrained classifier on public sample image",
    "evidence": "Result with uncertainty"
  },
  {
    "day": 83,
    "phase": 2,
    "title": "Object detection",
    "concept": "Understand IoU and false positives",
    "lab": "Calculate IoU for two bounding boxes",
    "evidence": "Detection evaluation"
  },
  {
    "day": 84,
    "phase": 2,
    "title": "OCR foundations",
    "concept": "Understand scanned PDFs and text recognition",
    "lab": "Extract synthetic invoice text with local OCR",
    "evidence": "Manual correction log"
  },
  {
    "day": 85,
    "phase": 2,
    "title": "Generative families",
    "concept": "Compare autoregressive text models, diffusion and GANs",
    "lab": "Map three tasks to correct model families",
    "evidence": "Technical comparison"
  },
  {
    "day": 86,
    "phase": 2,
    "title": "Reinforcement learning",
    "concept": "Learn action, state, policy and reward",
    "lab": "Simulate multi-armed bandit in Python",
    "evidence": "Reward curve and limits"
  },
  {
    "day": 87,
    "phase": 2,
    "title": "Recommender systems",
    "concept": "Learn collaborative versus content filtering",
    "lab": "Recommend learning topics from synthetic history",
    "evidence": "No other-user data leakage"
  },
  {
    "day": 88,
    "phase": 2,
    "title": "Multilingual NLP",
    "concept": "Evaluate spelling variations and code switching",
    "lab": "Test mixed Bangla-English issue examples",
    "evidence": "Hard-case list"
  },
  {
    "day": 89,
    "phase": 2,
    "title": "Inference adapter",
    "concept": "Expose model prediction through ASP.NET Core",
    "lab": "Create bounded text classification endpoint",
    "evidence": "Safe timeout and DTO validation"
  },
  {
    "day": 90,
    "phase": 2,
    "title": "Capstone 3",
    "concept": "Finish issue classifier with baseline comparison",
    "lab": "Package data, model, API and evaluation report",
    "evidence": "Support Ticket Classifier v1"
  },
  {
    "day": 91,
    "phase": 3,
    "title": "LLM fundamentals",
    "concept": "Learn language-model strengths, hallucination and output limits",
    "lab": "Build synthetic question prompts and compare outputs",
    "evidence": "Known versus inferred claims labeled"
  },
  {
    "day": 92,
    "phase": 3,
    "title": "Prompt engineering",
    "concept": "Specify context, output format and constraints",
    "lab": "Version five ERP explanation prompts",
    "evidence": "Golden prompt examples"
  },
  {
    "day": 93,
    "phase": 3,
    "title": "API key safety",
    "concept": "Keep provider keys on backend, not JavaScript",
    "lab": "Read AI key and model from environment variables",
    "evidence": "No credential in Git or browser"
  },
  {
    "day": 94,
    "phase": 3,
    "title": "C# model API",
    "concept": "Call model through server-side .NET service",
    "lab": "Create .NET 8 HttpClient Responses API demo",
    "evidence": "JSON response with cancellation"
  },
  {
    "day": 95,
    "phase": 3,
    "title": "Structured JSON",
    "concept": "Validate AI drafts against deterministic schema",
    "lab": "Parse invoice draft and check decimal total",
    "evidence": "Malformed data rejected"
  },
  {
    "day": 96,
    "phase": 3,
    "title": "Streaming output",
    "concept": "Understand incremental response, cancellation and timeout",
    "lab": "Build simple text streaming client",
    "evidence": "Cancel request cleanly"
  },
  {
    "day": 97,
    "phase": 3,
    "title": "Token budget",
    "concept": "Learn context windows and truncation failures",
    "lab": "Count and cap input document chunks",
    "evidence": "Known prompt size budget"
  },
  {
    "day": 98,
    "phase": 3,
    "title": "LLM evaluation",
    "concept": "Evaluate factuality, completeness and groundedness",
    "lab": "Create ten golden ERP queries with expected outputs",
    "evidence": "Comparable evaluation report"
  },
  {
    "day": 99,
    "phase": 3,
    "title": "Prompt injection",
    "concept": "Treat documents and tool outputs as untrusted",
    "lab": "Embed malicious instruction in fake supplier note",
    "evidence": "No unauthorized tool action"
  },
  {
    "day": 100,
    "phase": 3,
    "title": "Embedding models",
    "concept": "Learn vector similarity and embedding dimension",
    "lab": "Generate or simulate policy paragraph vectors",
    "evidence": "Top matches by similarity"
  },
  {
    "day": 101,
    "phase": 3,
    "title": "Chunking",
    "concept": "Preserve heading, page and source IDs in chunks",
    "lab": "Split ERP policy into stable titled chunks",
    "evidence": "Trace every chunk to source"
  },
  {
    "day": 102,
    "phase": 3,
    "title": "Vector search",
    "concept": "Apply tenant filter before semantic retrieval",
    "lab": "Create indexed toy document search",
    "evidence": "Cross-tenant results excluded"
  },
  {
    "day": 103,
    "phase": 3,
    "title": "Hybrid retrieval",
    "concept": "Mix exact SKU search with semantic matches",
    "lab": "Add keyword+vector ranking on sample items",
    "evidence": "Improved retrieval examples"
  },
  {
    "day": 104,
    "phase": 3,
    "title": "RAG architecture",
    "concept": "Retrieve documents then compose source-grounded answer",
    "lab": "Build query-retrieve-answer pipeline",
    "evidence": "Answer references source IDs"
  },
  {
    "day": 105,
    "phase": 3,
    "title": "RAG abstention",
    "concept": "Avoid answers when retrieval evidence is missing",
    "lab": "Test questions outside data source",
    "evidence": "Explicit unsupported answer"
  },
  {
    "day": 106,
    "phase": 3,
    "title": "Document ingestion",
    "concept": "Handle revisions and document deletion",
    "lab": "Replace HR policy v1 with v2 in index",
    "evidence": "Old deleted paragraphs inaccessible"
  },
  {
    "day": 107,
    "phase": 3,
    "title": "Approved SQL tools",
    "concept": "Expose report catalog, never arbitrary model SQL",
    "lab": "Build typed GetProjectProfit tool",
    "evidence": "Only server-authorized SQL runs"
  },
  {
    "day": 108,
    "phase": 3,
    "title": "Function calling",
    "concept": "Validate tool name and strict arguments",
    "lab": "Implement one read-only inventory summary tool",
    "evidence": "Invalid tool request rejected"
  },
  {
    "day": 109,
    "phase": 3,
    "title": "Confirmation workflow",
    "concept": "Require approval before any ERP posting",
    "lab": "Build proposed stock draft with confirm action",
    "evidence": "No automatic stock write"
  },
  {
    "day": 110,
    "phase": 3,
    "title": "Agent loop",
    "concept": "Limit max steps, tokens, tool calls and retries",
    "lab": "Implement bounded tool loop with C# handlers",
    "evidence": "No infinite recursion"
  },
  {
    "day": 111,
    "phase": 3,
    "title": "Tool authorization",
    "concept": "Recheck tenant/user roles at execution time",
    "lab": "Test AI request for another company's report",
    "evidence": "Access denied before SQL"
  },
  {
    "day": 112,
    "phase": 3,
    "title": "Conversation context",
    "concept": "Distinguish short-term context and durable memory",
    "lab": "Store minimal nonsecret conversation data",
    "evidence": "Retention and delete rule"
  },
  {
    "day": 113,
    "phase": 3,
    "title": "Specialist agents",
    "concept": "Use agent separation only when justified",
    "lab": "Route Farm and Accounts questions to typed tools",
    "evidence": "One source of truth per domain"
  },
  {
    "day": 114,
    "phase": 3,
    "title": "Human approval",
    "concept": "Treat model outputs as proposals until accepted",
    "lab": "Build review screen for accounting action",
    "evidence": "Audited approval transition"
  },
  {
    "day": 115,
    "phase": 3,
    "title": "Tool audit",
    "concept": "Log actor, tenant, prompt version and tool ID",
    "lab": "Create sanitized AI action receipt",
    "evidence": "Traceable answer without secrets"
  },
  {
    "day": 116,
    "phase": 3,
    "title": "Cost and latency",
    "concept": "Measure model usage and timeout handling",
    "lab": "Log bounded call duration and usage",
    "evidence": "Per-tenant budget summary"
  },
  {
    "day": 117,
    "phase": 3,
    "title": "RAG testing",
    "concept": "Measure retrieval recall and factual answer accuracy",
    "lab": "Test ten EduOS attendance questions",
    "evidence": "Source and answer accuracy report"
  },
  {
    "day": 118,
    "phase": 3,
    "title": "Agent failure QA",
    "concept": "Test duplicate calls and tool failure",
    "lab": "Simulate timeout, retry and partial tool result",
    "evidence": "No double posting"
  },
  {
    "day": 119,
    "phase": 3,
    "title": "ERP assistant integration",
    "concept": "Connect report tools with policy retrieval",
    "lab": "Build ASP.NET safe read-only assistant",
    "evidence": "Tenant-scoped sources"
  },
  {
    "day": 120,
    "phase": 3,
    "title": "Capstone 4",
    "concept": "Ship report and policy AI assistant",
    "lab": "Package RAG, model adapter, QA and docs",
    "evidence": "AI ERP Assistant v1"
  },
  {
    "day": 121,
    "phase": 4,
    "title": "Speech AI concepts",
    "concept": "Distinguish ASR, TTS and language detection",
    "lab": "Compare manual transcripts to recognized Bangla speech",
    "evidence": "Error and latency baseline"
  },
  {
    "day": 122,
    "phase": 4,
    "title": "Browser speech",
    "concept": "Understand Web Speech API and availability limits",
    "lab": "Build microphone button plus editable transcript",
    "evidence": "Typed fallback always works"
  },
  {
    "day": 123,
    "phase": 4,
    "title": "Server transcription",
    "concept": "Keep speech credentials server-side and files bounded",
    "lab": "Define ITranscriptionService in ASP.NET Core",
    "evidence": "Reject oversized audio safely"
  },
  {
    "day": 124,
    "phase": 4,
    "title": "Bangla commands",
    "concept": "Map limited utterances to explicit intents",
    "lab": "Parse ten synthetic feed distribution commands",
    "evidence": "Unknown commands ask for review"
  },
  {
    "day": 125,
    "phase": 4,
    "title": "Slot extraction",
    "concept": "Find quantity, unit, date, project and item",
    "lab": "Convert phrase into typed CommandDraft DTO",
    "evidence": "Missing slots rejected"
  },
  {
    "day": 126,
    "phase": 4,
    "title": "Confirmation UI",
    "concept": "Never save transactional output without user review",
    "lab": "Create editable recognized-command form",
    "evidence": "Verified draft before save"
  },
  {
    "day": 127,
    "phase": 4,
    "title": "Speech evaluation",
    "concept": "Track transcription error separately from intent accuracy",
    "lab": "Evaluate ten noisy Bangla commands",
    "evidence": "WER and slot accuracy report"
  },
  {
    "day": 128,
    "phase": 4,
    "title": "Text to speech",
    "concept": "Learn voice output and access considerations",
    "lab": "Read draft summary using speech synthesis",
    "evidence": "Stop/cancel accessible"
  },
  {
    "day": 129,
    "phase": 4,
    "title": "Voice accessibility",
    "concept": "Support touch, keyboard and no microphone",
    "lab": "Add manual input and labeled controls",
    "evidence": "Complete flow keyboard-only"
  },
  {
    "day": 130,
    "phase": 4,
    "title": "Page-wise voice",
    "concept": "Limit recognized fields to active page schema",
    "lab": "Define per-page voice field whitelist",
    "evidence": "Other-page fields rejected"
  },
  {
    "day": 131,
    "phase": 4,
    "title": "Single-page voice",
    "concept": "Route commands into one draft workspace safely",
    "lab": "Implement intent switch with review panels",
    "evidence": "One verified draft per command"
  },
  {
    "day": 132,
    "phase": 4,
    "title": "OCR capture",
    "concept": "Learn image quality, orientation and scanning",
    "lab": "Preprocess sample supplier invoice",
    "evidence": "Image extraction quality check"
  },
  {
    "day": 133,
    "phase": 4,
    "title": "Invoice extraction",
    "concept": "Parse vendor, date, line qty and price",
    "lab": "Map OCR text into InvoiceDraft model",
    "evidence": "Line fields and source text"
  },
  {
    "day": 134,
    "phase": 4,
    "title": "Invoice reconciliation",
    "concept": "Check totals, discount, tax, duplicate invoice",
    "lab": "Implement decimal invoice validator",
    "evidence": "Deliberate mismatch blocked"
  },
  {
    "day": 135,
    "phase": 4,
    "title": "Upload security",
    "concept": "Validate format, size, authorization and retention",
    "lab": "Build safe document upload endpoint",
    "evidence": "Invalid file rejected"
  },
  {
    "day": 136,
    "phase": 4,
    "title": "Image classification",
    "concept": "Understand confidence and unknown-class handling",
    "lab": "Label synthetic animal image with model",
    "evidence": "Human-reviewed classification"
  },
  {
    "day": 137,
    "phase": 4,
    "title": "PDF processing",
    "concept": "Separate text PDF from scanned pages",
    "lab": "Route one document to text extraction or OCR",
    "evidence": "Page count and source IDs"
  },
  {
    "day": 138,
    "phase": 4,
    "title": "Multimodal API",
    "concept": "Combine image and text in bounded prompt",
    "lab": "Request structured invoice extraction",
    "evidence": "Schema validation report"
  },
  {
    "day": 139,
    "phase": 4,
    "title": "Local models",
    "concept": "Compare offline inference, memory and latency",
    "lab": "Run small local model if host permits",
    "evidence": "Hardware and response benchmark"
  },
  {
    "day": 140,
    "phase": 4,
    "title": "Provider abstraction",
    "concept": "Avoid vendor coupling in ERP domain code",
    "lab": "Implement ITextModel and local provider adapter",
    "evidence": "Swap providers without controller edits"
  },
  {
    "day": 141,
    "phase": 4,
    "title": "Quantization",
    "concept": "Learn accuracy versus memory tradeoffs",
    "lab": "Compare local model quantized variants",
    "evidence": "Quality and latency table"
  },
  {
    "day": 142,
    "phase": 4,
    "title": "Offline behavior",
    "concept": "Never confuse cached UI with completed stock write",
    "lab": "Simulate disconnection during voice entry",
    "evidence": "Unsynced draft clearly identified"
  },
  {
    "day": 143,
    "phase": 4,
    "title": "Audio privacy",
    "concept": "Document microphone consent and external processing",
    "lab": "Write accurate speech privacy notice",
    "evidence": "No false offline claim"
  },
  {
    "day": 144,
    "phase": 4,
    "title": "Accessibility QA",
    "concept": "Check contrast, labels and keyboard control",
    "lab": "Test voice/OCR screens without mouse",
    "evidence": "Accessibility checklist"
  },
  {
    "day": 145,
    "phase": 4,
    "title": "OCR review workflow",
    "concept": "Integrate extraction, corrections and approval",
    "lab": "Create invoice staging API and view",
    "evidence": "No purchase posting before confirmation"
  },
  {
    "day": 146,
    "phase": 4,
    "title": "Voice ERP workflow",
    "concept": "Map Bangla action into safe staging DTO",
    "lab": "Connect Farm feed draft to fake API",
    "evidence": "Validated draft, no auto issue"
  },
  {
    "day": 147,
    "phase": 4,
    "title": "Multimodal security",
    "concept": "Test hostile text hidden in uploaded document",
    "lab": "Inject model-directed command into invoice text",
    "evidence": "No tool execution"
  },
  {
    "day": 148,
    "phase": 4,
    "title": "Failure injection",
    "concept": "Simulate OCR failure and speech timeout",
    "lab": "Write integration tests for three failures",
    "evidence": "No duplicate transaction"
  },
  {
    "day": 149,
    "phase": 4,
    "title": "Pilot feedback",
    "concept": "Record noisy audio, OCR layout and locale mistakes",
    "lab": "Gather five manual UAT cases",
    "evidence": "Documented improvements"
  },
  {
    "day": 150,
    "phase": 4,
    "title": "Capstone 5",
    "concept": "Finish voice and OCR prototypes",
    "lab": "Package editable drafts and integration tests",
    "evidence": "Voice Entry & Invoice Reader v1"
  },
  {
    "day": 151,
    "phase": 5,
    "title": "AI architecture",
    "concept": "Keep AI as adapter of existing modular ERP",
    "lab": "Draw domain boundary and source-of-truth map",
    "evidence": "No duplicate editable facts"
  },
  {
    "day": 152,
    "phase": 5,
    "title": "Threat modeling",
    "concept": "List prompt injection, exfiltration and IDOR",
    "lab": "Create security attack case table",
    "evidence": "Mitigated risk register"
  },
  {
    "day": 153,
    "phase": 5,
    "title": "Tenant isolation",
    "concept": "Scope RAG, SQL tools, logs and cache by tenant",
    "lab": "Test two synthetic tenants and unauthorized read",
    "evidence": "Zero cross-tenant access"
  },
  {
    "day": 154,
    "phase": 5,
    "title": "Policy authorization",
    "concept": "Enforce user/project permission on server",
    "lab": "Add permission gate to AI tool executor",
    "evidence": "Forbidden request rejected"
  },
  {
    "day": 155,
    "phase": 5,
    "title": "Transactions",
    "concept": "Use atomic approved business actions",
    "lab": "Implement draft confirmation with concurrency guard",
    "evidence": "Consistent rollback"
  },
  {
    "day": 156,
    "phase": 5,
    "title": "Idempotency",
    "concept": "Prevent retries from double creating vouchers",
    "lab": "Create unique tenant+command key",
    "evidence": "Duplicate request safely ignored"
  },
  {
    "day": 157,
    "phase": 5,
    "title": "Audit traceability",
    "concept": "Track model version and tool ID without secrets",
    "lab": "Log correlated tool execution events",
    "evidence": "Reproducible trace"
  },
  {
    "day": 158,
    "phase": 5,
    "title": "Observability",
    "concept": "Measure p95, error rate and usage",
    "lab": "Instrument provider and SQL tool calls",
    "evidence": "Latency report"
  },
  {
    "day": 159,
    "phase": 5,
    "title": "Reliability",
    "concept": "Apply bounded timeout, retry and safe fallback",
    "lab": "Test provider outage in demo",
    "evidence": "ERP core remains usable"
  },
  {
    "day": 160,
    "phase": 5,
    "title": "Golden evaluations",
    "concept": "Build fixed expected answer corpus",
    "lab": "Automate ten accounting/farm answer checks",
    "evidence": "Regression gate"
  },
  {
    "day": 161,
    "phase": 5,
    "title": "Red-team exercises",
    "concept": "Test malicious document instruction and hostile prompts",
    "lab": "Run unauthorized tool call attempts",
    "evidence": "Blocked unsafe actions"
  },
  {
    "day": 162,
    "phase": 5,
    "title": "Privacy controls",
    "concept": "Define retention, redaction and deletion",
    "lab": "Implement demo message deletion",
    "evidence": "PII no longer retrievable"
  },
  {
    "day": 163,
    "phase": 5,
    "title": "Performance",
    "concept": "Use bounded retrieval, server paging and indexes",
    "lab": "Benchmark 100 synthetic concurrent requests",
    "evidence": "Bottlenecks identified"
  },
  {
    "day": 164,
    "phase": 5,
    "title": "Caching",
    "concept": "Never cache stock balance as authoritative",
    "lab": "Cache only tenant-safe static policy snippet",
    "evidence": "No stale accounting decision"
  },
  {
    "day": 165,
    "phase": 5,
    "title": "Deployment options",
    "concept": "Compare hosted/local models and secrets deployment",
    "lab": "Write staging and prod configuration",
    "evidence": "No secret committed"
  },
  {
    "day": 166,
    "phase": 5,
    "title": "CI checks",
    "concept": "Automate syntax, tests and golden evaluations",
    "lab": "Add pipeline for source, model and prompts",
    "evidence": "Failed tests block release"
  },
  {
    "day": 167,
    "phase": 5,
    "title": "Model governance",
    "concept": "Record license, dataset and limitations",
    "lab": "Write model card for one service",
    "evidence": "Reproducible model pedigree"
  },
  {
    "day": 168,
    "phase": 5,
    "title": "Financial safeguards",
    "concept": "Keep LLM from direct voucher posting",
    "lab": "Build approved command flow with invariants",
    "evidence": "Balanced posting after review"
  },
  {
    "day": 169,
    "phase": 5,
    "title": "Historical reporting",
    "concept": "Preserve immutable posted transaction history",
    "lab": "Test old balance report after master rename",
    "evidence": "Historical amount unchanged"
  },
  {
    "day": 170,
    "phase": 5,
    "title": "Monitoring drift",
    "concept": "Set threshold for changing input distributions",
    "lab": "Compare baseline and current metric window",
    "evidence": "Alert without silent retrain"
  },
  {
    "day": 171,
    "phase": 5,
    "title": "Integration contracts",
    "concept": "Define Farm, Accounts, HRM, EduOS tools",
    "lab": "Write typed interface contracts",
    "evidence": "Stable ownership across modules"
  },
  {
    "day": 172,
    "phase": 5,
    "title": "Farm assistant",
    "concept": "Expose dairy, feed and pregnancy summaries",
    "lab": "Build authorized read-only FarmSummary query",
    "evidence": "Real SQL-backed answer"
  },
  {
    "day": 173,
    "phase": 5,
    "title": "Accounts assistant",
    "concept": "Return ledger opening/closing from trusted reports",
    "lab": "Implement vetted balance report tool",
    "evidence": "No invented totals"
  },
  {
    "day": 174,
    "phase": 5,
    "title": "HRM assistant",
    "concept": "Answer leave and policy questions with citations",
    "lab": "Index approved synthetic HR policies",
    "evidence": "Role-scoped source snippets"
  },
  {
    "day": 175,
    "phase": 5,
    "title": "EduOS assistant",
    "concept": "Answer attendance and fee queries by institution",
    "lab": "Build education-specific API tool",
    "evidence": "Institution isolation tests"
  },
  {
    "day": 176,
    "phase": 5,
    "title": "Voice and OCR joining",
    "concept": "Connect approved drafts to production APIs safely",
    "lab": "Write contract tests for confirmation",
    "evidence": "No silent stock or financial mutation"
  },
  {
    "day": 177,
    "phase": 5,
    "title": "Operations runbook",
    "concept": "Plan rollback, backup and disable switch",
    "lab": "Write incident response and AI-off procedure",
    "evidence": "Core ERP works with AI disabled"
  },
  {
    "day": 178,
    "phase": 5,
    "title": "Full QA",
    "concept": "Re-run security, load, idempotency and golden suite",
    "lab": "Produce test report and failures list",
    "evidence": "Explicit release gate"
  },
  {
    "day": 179,
    "phase": 5,
    "title": "Pilot release",
    "concept": "Test with authorized users and safe data",
    "lab": "Collect UAT and record defects",
    "evidence": "Pilot decision with evidence"
  },
  {
    "day": 180,
    "phase": 5,
    "title": "Final capstone",
    "concept": "Demonstrate combined AI ERP features and architecture",
    "lab": "Publish portfolio-ready demo, ADRs and QA report",
    "evidence": "Technovate AI ERP reference project"
  }
];
export const AI_EXAMPLES = [
  {
    "day": 1,
    "language": "C# / .NET Console",
    "title": "Baseline milk forecast",
    "setup": "dotnet new console -n AiDay01",
    "code": "using System;\nusing System.Linq;\n\npublic class Program\n{\n    public static void Main()\n    {\n        decimal[] milkKg = { 118m, 124m, 121m, 127m, 132m, 129m, 137m };\n        decimal forecast = milkKg.Skip(milkKg.Length - 3).Average();\n        decimal error = 0;\n        for (int i = 3; i < milkKg.Length; i++)\n            error += Math.Abs(milkKg[i] - milkKg.Skip(i - 3).Take(3).Average());\n        Console.WriteLine(\"Next-day baseline: \" + forecast.ToString(\"F2\") + \" kg\");\n        Console.WriteLine(\"Backtest MAE: \" + (error / (milkKg.Length - 3)).ToString(\"F2\") + \" kg\");\n    }\n}",
    "expected": "A numerical forecast and backtest MAE. This is NOT a trained ML model."
  },
  {
    "day": 7,
    "language": "SQL Server",
    "title": "Tenant-safe report query",
    "setup": "DemoProduction is an illustrative table. Adapt only after checking your real schema.",
    "code": "DECLARE @CompanyId int = 10;\nDECLARE @StartDate date = '2026-10-01';\nDECLARE @EndDate date = '2026-11-01';\nSELECT CompanyInfoId, ProjectId, ProductionDate,\n       SUM(Quantity) AS TotalQuantity\nFROM dbo.DemoProduction\nWHERE CompanyInfoId = @CompanyId\n  AND ProductionDate >= @StartDate\n  AND ProductionDate < @EndDate\nGROUP BY CompanyInfoId, ProjectId, ProductionDate\nORDER BY ProductionDate;",
    "expected": "No cross-tenant rows, no inflated aggregation."
  },
  {
    "day": 12,
    "language": "C#",
    "title": "Dot product",
    "setup": "Put this method inside a class in a .NET console project.",
    "code": "static decimal Dot(decimal[] a, decimal[] b)\n{\n    if (a == null || b == null || a.Length != b.Length)\n        throw new ArgumentException(\"Vector mismatch\");\n    decimal value = 0m;\n    for (int i = 0; i < a.Length; i++) value += a[i] * b[i];\n    return value;\n}",
    "expected": "Dot([1,2],[3,4]) = 11, mismatched arrays throw."
  },
  {
    "day": 18,
    "language": "Python + pandas",
    "title": "Chronological split",
    "setup": "pip install pandas",
    "code": "import pandas as pd\nrows = pd.DataFrame({\n    \"date\": pd.date_range(\"2026-01-01\", periods=20),\n    \"quantity\": list(range(100, 120))\n})\ntrain = rows.iloc[:12].copy()\nvalid = rows.iloc[12:16].copy()\ntest = rows.iloc[16:].copy()\nassert train.date.max() < valid.date.min()\nassert valid.date.max() < test.date.min()\nprint(len(train), len(valid), len(test))",
    "expected": "12 / 4 / 4 records with no future dates in training."
  },
  {
    "day": 19,
    "language": "C#",
    "title": "Mean absolute error",
    "setup": "Add using System and using System.Linq.",
    "code": "static decimal Mae(decimal[] actual, decimal[] predicted)\n{\n    if (actual == null || predicted == null ||\n        actual.Length == 0 || actual.Length != predicted.Length)\n        throw new ArgumentException(\"Invalid arrays\");\n    return actual.Zip(predicted, (a, p) => Math.Abs(a-p)).Average();\n}",
    "expected": "MAE is a nonnegative average of absolute forecast errors."
  },
  {
    "day": 31,
    "language": "C# / ML.NET",
    "title": "Start an ML.NET experiment",
    "setup": "dotnet new console -n StockML; cd StockML; dotnet add package Microsoft.ML",
    "code": "using Microsoft.ML;\npublic class Program\n{\n    public static void Main()\n    {\n        var ml = new MLContext(seed: 42);\n        Console.WriteLine(\"ML.NET initialized: \" + (ml != null));\n    }\n}",
    "expected": "The pinned ML.NET package restores and initializes correctly."
  },
  {
    "day": 33,
    "language": "C# / ML.NET",
    "title": "Synthetic regression example",
    "setup": "Add Microsoft.ML package. Tiny data is for learning, not production accuracy.",
    "code": "using Microsoft.ML;\nusing Microsoft.ML.Data;\npublic class InputRow { public float Price { get; set; } public float Sold { get; set; } }\npublic class OutputRow { [ColumnName(\"Score\")] public float Score { get; set; } }\npublic class Program\n{\n    public static void Main()\n    {\n        var ml = new MLContext(seed: 42);\n        var rows = new[] {\n            new InputRow { Price=10, Sold=80 }, new InputRow { Price=20, Sold=60 },\n            new InputRow { Price=30, Sold=40 }, new InputRow { Price=40, Sold=20 }\n        };\n        var data = ml.Data.LoadFromEnumerable(rows);\n        var pipeline = ml.Transforms.Concatenate(\"Features\",nameof(InputRow.Price))\n            .Append(ml.Regression.Trainers.Sdca(labelColumnName:nameof(InputRow.Sold)));\n        var model = pipeline.Fit(data);\n        Console.WriteLine(model != null ? \"Model trained\" : \"Failed\");\n    }\n}",
    "expected": "Synthetic regression fits; still needs independent holdout evaluation."
  },
  {
    "day": 61,
    "language": "Python / PyTorch",
    "title": "Automatic differentiation",
    "setup": "Install the correct PyTorch build from its official guide.",
    "code": "import torch\nx = torch.tensor(3.0, requires_grad=True)\ny = x*x + 2*x\ny.backward()\nprint(\"value:\", y.item(), \"gradient:\", x.grad.item())",
    "expected": "Value 15 and gradient 8."
  },
  {
    "day": 66,
    "language": "Python / PyTorch",
    "title": "Gradient descent",
    "setup": "Use the same tested Python environment.",
    "code": "import torch\nw = torch.tensor(0.0, requires_grad=True)\nopt = torch.optim.SGD([w], lr=0.1)\nfor epoch in range(20):\n    opt.zero_grad()\n    loss = (w-4)**2\n    loss.backward()\n    opt.step()\nprint(round(w.item(), 3))",
    "expected": "The fitted scalar moves toward 4."
  },
  {
    "day": 76,
    "language": "Python + NumPy",
    "title": "Toy scaled attention",
    "setup": "pip install numpy",
    "code": "import numpy as np\nq = np.array([[1.,0.]])\nk = np.array([[1.,0.],[0.,1.]])\nscores = q @ k.T / np.sqrt(2)\nweights = np.exp(scores-scores.max(axis=-1,keepdims=True))\nweights /= weights.sum(axis=-1,keepdims=True)\nprint(weights, weights.sum())",
    "expected": "Attention weights sum to 1."
  },
  {
    "day": 91,
    "language": "C# / .NET 8",
    "title": "Secure model API call",
    "setup": "Set OPENAI_API_KEY and AI_MODEL on the server, never in JavaScript. Uses the Responses API.",
    "code": "using System;\nusing System.Net.Http;\nusing System.Net.Http.Headers;\nusing System.Text;\nusing System.Text.Json;\nusing System.Threading.Tasks;\npublic class Program\n{\n    public static async Task Main()\n    {\n        string key = Environment.GetEnvironmentVariable(\"OPENAI_API_KEY\")\n                     ?? throw new InvalidOperationException(\"Missing API key\");\n        string model = Environment.GetEnvironmentVariable(\"AI_MODEL\")\n                       ?? throw new InvalidOperationException(\"Missing model\");\n        using var http = new HttpClient { Timeout = TimeSpan.FromSeconds(30) };\n        http.DefaultRequestHeaders.Authorization =\n            new AuthenticationHeaderValue(\"Bearer\", key);\n        string json = JsonSerializer.Serialize(new {\n            model, input = \"Explain RAG in simple Bangla.\"\n        });\n        using var response = await http.PostAsync(\n            \"https://api.openai.com/v1/responses\",\n            new StringContent(json, Encoding.UTF8, \"application/json\"));\n        response.EnsureSuccessStatusCode();\n        Console.WriteLine(await response.Content.ReadAsStringAsync());\n    }\n}",
    "expected": "Model returns JSON. Do not log sensitive ERP records or the API key."
  },
  {
    "day": 95,
    "language": "C# / .NET 8",
    "title": "Validate AI-extracted invoice draft",
    "setup": "Use deterministic decimal arithmetic, not LLM confidence.",
    "code": "public sealed record InvoiceDraft(decimal Qty, decimal Rate, decimal Total);\nstatic bool IsValid(InvoiceDraft value) =>\n    value.Qty > 0m && value.Rate >= 0m &&\n    System.Math.Abs(value.Qty*value.Rate-value.Total) <= 0.01m;",
    "expected": "Incorrect invoice totals are rejected."
  },
  {
    "day": 101,
    "language": "C#",
    "title": "Cosine similarity",
    "setup": "Numeric vectors must be the same dimension.",
    "code": "static double Cosine(double[] a, double[] b)\n{\n    if (a == null || b == null || a.Length == 0 || a.Length != b.Length)\n        throw new ArgumentException(\"Vector dimensions\");\n    double dot=0, x=0, y=0;\n    for(int i=0;i<a.Length;i++) {\n        dot+=a[i]*b[i]; x+=a[i]*a[i]; y+=b[i]*b[i];\n    }\n    return x==0 || y==0 ? 0 : dot/System.Math.Sqrt(x*y);\n}",
    "expected": "Identical nonzero vectors have similarity close to 1."
  },
  {
    "day": 107,
    "language": "C#",
    "title": "Whitelisted SQL report tools",
    "setup": "Authorize the user and tenant before calling any report.",
    "code": "using System;\nusing System.Collections.Generic;\nstatic readonly HashSet<string> AllowedReports =\n    new HashSet<string>(StringComparer.OrdinalIgnoreCase) {\n        \"FarmDailySummary\", \"AccountsTrialBalance\", \"EduOSAttendance\"\n    };\nstatic bool IsKnownTool(string name) => AllowedReports.Contains(name);\n// The server still checks access to the selected company and project.",
    "expected": "Model-generated raw SQL is not executable."
  },
  {
    "day": 110,
    "language": "C#",
    "title": "Bounded agent orchestration",
    "setup": "Use a maximum tool-step count and cancellation token.",
    "code": "for (int step = 0; step < 4; step++)\n{\n    // Resolve a typed tool action only from the allowlist.\n    // Stop on a valid result; refuse or retry only under a bounded policy.\n}\n// Never infer successful posting from the model's text alone.",
    "expected": "An agent cannot run indefinitely or bypass permissions."
  },
  {
    "day": 121,
    "language": "JavaScript / browser",
    "title": "Speech-to-text draft",
    "setup": "Provide #startMic button and editable #transcript input. Not supported in every browser.",
    "code": "const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;\nconst transcript = document.querySelector(\"#transcript\");\nif (Recognition) {\n  const rec = new Recognition();\n  rec.lang = \"bn-BD\";\n  rec.onresult = e => { transcript.value = e.results[0][0].transcript; };\n  document.querySelector(\"#startMic\").onclick = () => rec.start();\n}\n// Keep typed input and explicit Confirm/Save Draft controls.",
    "expected": "Voice fills a draft, never automatically posts stock or a voucher."
  },
  {
    "day": 124,
    "language": "JavaScript",
    "title": "Bangla digit normalization",
    "setup": "A deterministic helper for known Bengali digits; still ask for confirmation.",
    "code": "const digits = \"০১২৩৪৫৬৭৮৯\";\nfunction normalizeBanglaNumbers(value) {\n  return value.replace(/[০-৯]/g, ch => String(digits.indexOf(ch)));\n}\nconst input = \"আজ ৫০০ কেজি খাবার বিতরণ\";\nconst normalized = normalizeBanglaNumbers(input);\nconst match = normalized.match(/(\\d+)\\s*কেজি/);\nconsole.log(match ? Number(match[1]) : \"Needs review\");",
    "expected": "Extracts 500 from one simple known phrase; ambiguous intents still need review."
  },
  {
    "day": 132,
    "language": "C#",
    "title": "Invoice arithmetic safeguard",
    "setup": "Use decimal for money and approve before any persistence.",
    "code": "static decimal CalculateTotal(decimal quantity, decimal rate, decimal discount)\n{\n    if (quantity <= 0 || rate < 0 || discount < 0)\n        throw new ArgumentOutOfRangeException();\n    decimal gross = quantity * rate;\n    if (discount > gross) throw new ArgumentException(\"Excess discount\");\n    return decimal.Round(gross - discount, 2);\n}",
    "expected": "Invalid discount and quantity are rejected."
  },
  {
    "day": 152,
    "language": "C#",
    "title": "Tenant boundary",
    "setup": "The authenticated tenant comes from server-side identity.",
    "code": "static void AssertProjectAccess(int authorizedCompanyId,\n                                int requestedCompanyId,\n                                bool hasProjectAccess)\n{\n    if (authorizedCompanyId != requestedCompanyId || !hasProjectAccess)\n        throw new UnauthorizedAccessException();\n}",
    "expected": "Another company's report cannot be retrieved by changing a model tool argument."
  },
  {
    "day": 156,
    "language": "SQL Server",
    "title": "Idempotency key schema",
    "setup": "Example additive migration; use an approved database deployment.",
    "code": "CREATE TABLE dbo.AiCommandReceipt(\n    Id bigint IDENTITY(1,1) NOT NULL PRIMARY KEY,\n    CompanyInfoId int NOT NULL,\n    IdempotencyKey nvarchar(100) NOT NULL,\n    CreatedAtUtc datetime2(7) NOT NULL DEFAULT SYSUTCDATETIME(),\n    CONSTRAINT UQ_AiCommandReceipt_TenantKey\n      UNIQUE(CompanyInfoId,IdempotencyKey)\n);",
    "expected": "Two requests with the same tenant/key cannot create duplicate receipts."
  },
  {
    "day": 160,
    "language": "C# / test design",
    "title": "Cross-tenant regression",
    "setup": "Run against two synthetic tenants and the real server permission layer.",
    "code": "// Arrange company 10 and company 20 with distinct report records.\n// Authenticate as company 10.\n// Request a company 20 report through the AI tool API.\n// Assert 403 or 404; never return company 20 data.\n// Repeat for vector retrieval, cache and file exports.",
    "expected": "Every data access layer enforces tenant and project authorization."
  }
];
export const AI_RESOURCES = [
  {
    "title": "Microsoft Learn — AI for .NET",
    "url": "https://learn.microsoft.com/en-us/dotnet/ai/"
  },
  {
    "title": "Microsoft Learn — ML.NET Tutorials",
    "url": "https://learn.microsoft.com/en-us/dotnet/machine-learning/tutorials/"
  },
  {
    "title": "PyTorch — Learn the Basics",
    "url": "https://docs.pytorch.org/tutorials/beginner/basics/intro.html"
  },
  {
    "title": "OpenAI API Documentation",
    "url": "https://platform.openai.com/docs/overview"
  },
  {
    "title": "ASP.NET Core Security",
    "url": "https://learn.microsoft.com/en-us/aspnet/core/security/"
  }
];
