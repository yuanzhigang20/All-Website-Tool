export const tools = [
  {
    "id": "bmi-calculator",
    "slug": "bmi-calculator",
    "name": "BMI Calculator",
    "category": "Body measurement",
    "title": "BMI Calculator | Free Online Calculator",
    "description": "Calculate body mass index from metric height and weight inputs.",
    "intro": "Calculate body mass index from metric height and weight inputs.",
    "resultExplanation": "The result explains the main bmi calculator output based on the values you enter.",
    "formula": "BMI = weight in kg / height in meters²",
    "fields": [
      {
        "id": "weight",
        "label": "Weight kg",
        "type": "number",
        "step": "any",
        "value": 70
      },
      {
        "id": "height",
        "label": "Height in cm",
        "type": "number",
        "step": "any",
        "value": 175
      }
    ],
    "examples": [
      {
        "title": "Everyday example",
        "text": "Enter realistic values to use the bmi calculator for school, work, home, or planning."
      },
      {
        "title": "Formula example",
        "text": "The calculator applies: BMI = weight in kg / height in meters²."
      },
      {
        "title": "Review example",
        "text": "Use the result as a helpful estimate and verify important decisions when needed."
      }
    ],
    "useCases": [
      "School work",
      "Everyday planning",
      "Quick estimates",
      "Mobile calculations",
      "Reference checks",
      "Learning formulas"
    ],
    "faq": [
      [
        "What does the BMI Calculator do?",
        "Calculate body mass index from metric height and weight inputs."
      ],
      [
        "Is my data uploaded?",
        "No. The calculation runs in your browser on this static site."
      ],
      [
        "Can I use it on mobile?",
        "Yes. The calculator is responsive and keyboard accessible."
      ],
      [
        "Is the result exact?",
        "It follows the displayed formula, but rounding and assumptions may apply."
      ],
      [
        "Should I verify important results?",
        "Yes. Verify important results with official or professional sources."
      ]
    ],
    "related": [
      "bmr-calculator",
      "calorie-calculator",
      "water-intake-calculator",
      "ideal-weight-calculator",
      "body-fat-calculator"
    ],
    "disclaimer": "This calculator is for general informational and educational purposes only. It is not medical advice, diagnosis, or treatment. Always consult a qualified healthcare professional for personal health questions."
  },
  {
    "id": "bmr-calculator",
    "slug": "bmr-calculator",
    "name": "BMR Calculator",
    "category": "Calories and nutrition",
    "title": "BMR Calculator | Free Online Calculator",
    "description": "Estimate basal metabolic rate using the Mifflin-St Jeor formula.",
    "intro": "Estimate basal metabolic rate using the Mifflin-St Jeor formula.",
    "resultExplanation": "The result explains the main bmr calculator output based on the values you enter.",
    "formula": "BMR = 10×kg + 6.25×cm − 5×age + sex adjustment",
    "fields": [
      {
        "id": "weight",
        "label": "Weight kg",
        "type": "number",
        "step": "any",
        "value": 70
      },
      {
        "id": "height",
        "label": "Height cm",
        "type": "number",
        "step": "any",
        "value": 175
      },
      {
        "id": "age",
        "label": "Age",
        "type": "number",
        "value": 30
      },
      {
        "id": "sex",
        "label": "Sex formula",
        "type": "select",
        "options": [
          "Male",
          "Female"
        ]
      }
    ],
    "examples": [
      {
        "title": "Everyday example",
        "text": "Enter realistic values to use the bmr calculator for school, work, home, or planning."
      },
      {
        "title": "Formula example",
        "text": "The calculator applies: BMR = 10×kg + 6.25×cm − 5×age + sex adjustment."
      },
      {
        "title": "Review example",
        "text": "Use the result as a helpful estimate and verify important decisions when needed."
      }
    ],
    "useCases": [
      "School work",
      "Everyday planning",
      "Quick estimates",
      "Mobile calculations",
      "Reference checks",
      "Learning formulas"
    ],
    "faq": [
      [
        "What does the BMR Calculator do?",
        "Estimate basal metabolic rate using the Mifflin-St Jeor formula."
      ],
      [
        "Is my data uploaded?",
        "No. The calculation runs in your browser on this static site."
      ],
      [
        "Can I use it on mobile?",
        "Yes. The calculator is responsive and keyboard accessible."
      ],
      [
        "Is the result exact?",
        "It follows the displayed formula, but rounding and assumptions may apply."
      ],
      [
        "Should I verify important results?",
        "Yes. Verify important results with official or professional sources."
      ]
    ],
    "related": [
      "bmi-calculator",
      "calorie-calculator",
      "water-intake-calculator",
      "ideal-weight-calculator",
      "body-fat-calculator"
    ],
    "disclaimer": "This calculator is for general informational and educational purposes only. It is not medical advice, diagnosis, or treatment. Always consult a qualified healthcare professional for personal health questions."
  },
  {
    "id": "calorie-calculator",
    "slug": "calorie-calculator",
    "name": "Calorie Calculator",
    "category": "Calories and nutrition",
    "title": "Calorie Calculator | Free Online Calculator",
    "description": "Estimate daily calories from BMR and activity level for general planning.",
    "intro": "Estimate daily calories from BMR and activity level for general planning.",
    "resultExplanation": "The result explains the main calorie calculator output based on the values you enter.",
    "formula": "daily calories = BMR × activity factor",
    "fields": [
      {
        "id": "weight",
        "label": "Weight kg",
        "type": "number",
        "step": "any",
        "value": 70
      },
      {
        "id": "height",
        "label": "Height cm",
        "type": "number",
        "step": "any",
        "value": 175
      },
      {
        "id": "age",
        "label": "Age",
        "type": "number",
        "value": 30
      },
      {
        "id": "sex",
        "label": "Sex formula",
        "type": "select",
        "options": [
          "Male",
          "Female"
        ]
      },
      {
        "id": "activity",
        "label": "Activity level",
        "type": "select",
        "options": [
          "Sedentary",
          "Light",
          "Moderate",
          "Active",
          "Very active"
        ]
      }
    ],
    "examples": [
      {
        "title": "Everyday example",
        "text": "Enter realistic values to use the calorie calculator for school, work, home, or planning."
      },
      {
        "title": "Formula example",
        "text": "The calculator applies: daily calories = BMR × activity factor."
      },
      {
        "title": "Review example",
        "text": "Use the result as a helpful estimate and verify important decisions when needed."
      }
    ],
    "useCases": [
      "School work",
      "Everyday planning",
      "Quick estimates",
      "Mobile calculations",
      "Reference checks",
      "Learning formulas"
    ],
    "faq": [
      [
        "What does the Calorie Calculator do?",
        "Estimate daily calories from BMR and activity level for general planning."
      ],
      [
        "Is my data uploaded?",
        "No. The calculation runs in your browser on this static site."
      ],
      [
        "Can I use it on mobile?",
        "Yes. The calculator is responsive and keyboard accessible."
      ],
      [
        "Is the result exact?",
        "It follows the displayed formula, but rounding and assumptions may apply."
      ],
      [
        "Should I verify important results?",
        "Yes. Verify important results with official or professional sources."
      ]
    ],
    "related": [
      "bmi-calculator",
      "bmr-calculator",
      "water-intake-calculator",
      "ideal-weight-calculator",
      "body-fat-calculator"
    ],
    "disclaimer": "This calculator is for general informational and educational purposes only. It is not medical advice, diagnosis, or treatment. Always consult a qualified healthcare professional for personal health questions."
  },
  {
    "id": "water-intake-calculator",
    "slug": "water-intake-calculator",
    "name": "Water Intake Calculator",
    "category": "Wellness",
    "title": "Water Intake Calculator | Free Online Calculator",
    "description": "Estimate daily water intake from body weight and activity level.",
    "intro": "Estimate daily water intake from body weight and activity level.",
    "resultExplanation": "The result explains the main water intake calculator output based on the values you enter.",
    "formula": "water ml ≈ body weight kg × 35 plus activity adjustment",
    "fields": [
      {
        "id": "weight",
        "label": "Weight kg",
        "type": "number",
        "step": "any",
        "value": 70
      },
      {
        "id": "activity",
        "label": "Activity level",
        "type": "select",
        "options": [
          "Low",
          "Moderate",
          "High"
        ]
      }
    ],
    "examples": [
      {
        "title": "Everyday example",
        "text": "Enter realistic values to use the water intake calculator for school, work, home, or planning."
      },
      {
        "title": "Formula example",
        "text": "The calculator applies: water ml ≈ body weight kg × 35 plus activity adjustment."
      },
      {
        "title": "Review example",
        "text": "Use the result as a helpful estimate and verify important decisions when needed."
      }
    ],
    "useCases": [
      "School work",
      "Everyday planning",
      "Quick estimates",
      "Mobile calculations",
      "Reference checks",
      "Learning formulas"
    ],
    "faq": [
      [
        "What does the Water Intake Calculator do?",
        "Estimate daily water intake from body weight and activity level."
      ],
      [
        "Is my data uploaded?",
        "No. The calculation runs in your browser on this static site."
      ],
      [
        "Can I use it on mobile?",
        "Yes. The calculator is responsive and keyboard accessible."
      ],
      [
        "Is the result exact?",
        "It follows the displayed formula, but rounding and assumptions may apply."
      ],
      [
        "Should I verify important results?",
        "Yes. Verify important results with official or professional sources."
      ]
    ],
    "related": [
      "bmi-calculator",
      "bmr-calculator",
      "calorie-calculator",
      "ideal-weight-calculator",
      "body-fat-calculator"
    ],
    "disclaimer": "This calculator is for general informational and educational purposes only. It is not medical advice, diagnosis, or treatment. Always consult a qualified healthcare professional for personal health questions."
  },
  {
    "id": "ideal-weight-calculator",
    "slug": "ideal-weight-calculator",
    "name": "Ideal Weight Calculator",
    "category": "Body measurement",
    "title": "Ideal Weight Calculator | Free Online Calculator",
    "description": "Estimate ideal body weight ranges from height and sex using common formulas.",
    "intro": "Estimate ideal body weight ranges from height and sex using common formulas.",
    "resultExplanation": "The result explains the main ideal weight calculator output based on the values you enter.",
    "formula": "Devine estimate uses height over 5 feet and sex-specific base weight",
    "fields": [
      {
        "id": "height",
        "label": "Height cm",
        "type": "number",
        "step": "any",
        "value": 175
      },
      {
        "id": "sex",
        "label": "Sex formula",
        "type": "select",
        "options": [
          "Male",
          "Female"
        ]
      }
    ],
    "examples": [
      {
        "title": "Everyday example",
        "text": "Enter realistic values to use the ideal weight calculator for school, work, home, or planning."
      },
      {
        "title": "Formula example",
        "text": "The calculator applies: Devine estimate uses height over 5 feet and sex-specific base weight."
      },
      {
        "title": "Review example",
        "text": "Use the result as a helpful estimate and verify important decisions when needed."
      }
    ],
    "useCases": [
      "School work",
      "Everyday planning",
      "Quick estimates",
      "Mobile calculations",
      "Reference checks",
      "Learning formulas"
    ],
    "faq": [
      [
        "What does the Ideal Weight Calculator do?",
        "Estimate ideal body weight ranges from height and sex using common formulas."
      ],
      [
        "Is my data uploaded?",
        "No. The calculation runs in your browser on this static site."
      ],
      [
        "Can I use it on mobile?",
        "Yes. The calculator is responsive and keyboard accessible."
      ],
      [
        "Is the result exact?",
        "It follows the displayed formula, but rounding and assumptions may apply."
      ],
      [
        "Should I verify important results?",
        "Yes. Verify important results with official or professional sources."
      ]
    ],
    "related": [
      "bmi-calculator",
      "bmr-calculator",
      "calorie-calculator",
      "water-intake-calculator",
      "body-fat-calculator"
    ],
    "disclaimer": "This calculator is for general informational and educational purposes only. It is not medical advice, diagnosis, or treatment. Always consult a qualified healthcare professional for personal health questions."
  },
  {
    "id": "body-fat-calculator",
    "slug": "body-fat-calculator",
    "name": "Body Fat Calculator",
    "category": "Body measurement",
    "title": "Body Fat Calculator | Free Online Calculator",
    "description": "Estimate body fat percentage from circumference measurements using a Navy-style formula.",
    "intro": "Estimate body fat percentage from circumference measurements using a Navy-style formula.",
    "resultExplanation": "The result explains the main body fat calculator output based on the values you enter.",
    "formula": "body fat estimate uses waist, neck, height, and hip for female formula",
    "fields": [
      {
        "id": "sex",
        "label": "Sex formula",
        "type": "select",
        "options": [
          "Male",
          "Female"
        ]
      },
      {
        "id": "waist",
        "label": "Waist cm",
        "type": "number",
        "step": "any",
        "value": 80
      },
      {
        "id": "neck",
        "label": "Neck cm",
        "type": "number",
        "step": "any",
        "value": 38
      },
      {
        "id": "hip",
        "label": "Hip cm for female formula",
        "type": "number",
        "step": "any",
        "value": 95
      },
      {
        "id": "height",
        "label": "Height cm",
        "type": "number",
        "step": "any",
        "value": 175
      }
    ],
    "examples": [
      {
        "title": "Everyday example",
        "text": "Enter realistic values to use the body fat calculator for school, work, home, or planning."
      },
      {
        "title": "Formula example",
        "text": "The calculator applies: body fat estimate uses waist, neck, height, and hip for female formula."
      },
      {
        "title": "Review example",
        "text": "Use the result as a helpful estimate and verify important decisions when needed."
      }
    ],
    "useCases": [
      "School work",
      "Everyday planning",
      "Quick estimates",
      "Mobile calculations",
      "Reference checks",
      "Learning formulas"
    ],
    "faq": [
      [
        "What does the Body Fat Calculator do?",
        "Estimate body fat percentage from circumference measurements using a Navy-style formula."
      ],
      [
        "Is my data uploaded?",
        "No. The calculation runs in your browser on this static site."
      ],
      [
        "Can I use it on mobile?",
        "Yes. The calculator is responsive and keyboard accessible."
      ],
      [
        "Is the result exact?",
        "It follows the displayed formula, but rounding and assumptions may apply."
      ],
      [
        "Should I verify important results?",
        "Yes. Verify important results with official or professional sources."
      ]
    ],
    "related": [
      "bmi-calculator",
      "bmr-calculator",
      "calorie-calculator",
      "water-intake-calculator",
      "ideal-weight-calculator"
    ],
    "disclaimer": "This calculator is for general informational and educational purposes only. It is not medical advice, diagnosis, or treatment. Always consult a qualified healthcare professional for personal health questions."
  },
  {
    "id": "pregnancy-due-date-calculator",
    "slug": "pregnancy-due-date-calculator",
    "name": "Pregnancy Due Date Calculator",
    "category": "Women’s health",
    "title": "Pregnancy Due Date Calculator | Free Online Calculator",
    "description": "Estimate a due date from the first day of the last menstrual period.",
    "intro": "Estimate a due date from the first day of the last menstrual period.",
    "resultExplanation": "The result explains the main pregnancy due date calculator output based on the values you enter.",
    "formula": "estimated due date = last menstrual period + 280 days",
    "fields": [
      {
        "id": "date",
        "label": "First day of last menstrual period",
        "type": "date"
      }
    ],
    "examples": [
      {
        "title": "Everyday example",
        "text": "Enter realistic values to use the pregnancy due date calculator for school, work, home, or planning."
      },
      {
        "title": "Formula example",
        "text": "The calculator applies: estimated due date = last menstrual period + 280 days."
      },
      {
        "title": "Review example",
        "text": "Use the result as a helpful estimate and verify important decisions when needed."
      }
    ],
    "useCases": [
      "School work",
      "Everyday planning",
      "Quick estimates",
      "Mobile calculations",
      "Reference checks",
      "Learning formulas"
    ],
    "faq": [
      [
        "What does the Pregnancy Due Date Calculator do?",
        "Estimate a due date from the first day of the last menstrual period."
      ],
      [
        "Is my data uploaded?",
        "No. The calculation runs in your browser on this static site."
      ],
      [
        "Can I use it on mobile?",
        "Yes. The calculator is responsive and keyboard accessible."
      ],
      [
        "Is the result exact?",
        "It follows the displayed formula, but rounding and assumptions may apply."
      ],
      [
        "Should I verify important results?",
        "Yes. Verify important results with official or professional sources."
      ]
    ],
    "related": [
      "bmi-calculator",
      "bmr-calculator",
      "calorie-calculator",
      "water-intake-calculator",
      "ideal-weight-calculator"
    ],
    "disclaimer": "This calculator is for general informational and educational purposes only. It is not medical advice, diagnosis, or treatment. Always consult a qualified healthcare professional for personal health questions."
  },
  {
    "id": "ovulation-calculator",
    "slug": "ovulation-calculator",
    "name": "Ovulation Calculator",
    "category": "Women’s health",
    "title": "Ovulation Calculator | Free Online Calculator",
    "description": "Estimate ovulation window from last menstrual period and cycle length.",
    "intro": "Estimate ovulation window from last menstrual period and cycle length.",
    "resultExplanation": "The result explains the main ovulation calculator output based on the values you enter.",
    "formula": "estimated ovulation date = next period date − 14 days",
    "fields": [
      {
        "id": "date",
        "label": "First day of last period",
        "type": "date"
      },
      {
        "id": "cycle",
        "label": "Cycle length in days",
        "type": "number",
        "value": 28
      }
    ],
    "examples": [
      {
        "title": "Everyday example",
        "text": "Enter realistic values to use the ovulation calculator for school, work, home, or planning."
      },
      {
        "title": "Formula example",
        "text": "The calculator applies: estimated ovulation date = next period date − 14 days."
      },
      {
        "title": "Review example",
        "text": "Use the result as a helpful estimate and verify important decisions when needed."
      }
    ],
    "useCases": [
      "School work",
      "Everyday planning",
      "Quick estimates",
      "Mobile calculations",
      "Reference checks",
      "Learning formulas"
    ],
    "faq": [
      [
        "What does the Ovulation Calculator do?",
        "Estimate ovulation window from last menstrual period and cycle length."
      ],
      [
        "Is my data uploaded?",
        "No. The calculation runs in your browser on this static site."
      ],
      [
        "Can I use it on mobile?",
        "Yes. The calculator is responsive and keyboard accessible."
      ],
      [
        "Is the result exact?",
        "It follows the displayed formula, but rounding and assumptions may apply."
      ],
      [
        "Should I verify important results?",
        "Yes. Verify important results with official or professional sources."
      ]
    ],
    "related": [
      "bmi-calculator",
      "bmr-calculator",
      "calorie-calculator",
      "water-intake-calculator",
      "ideal-weight-calculator"
    ],
    "disclaimer": "This calculator is for general informational and educational purposes only. It is not medical advice, diagnosis, or treatment. Always consult a qualified healthcare professional for personal health questions."
  },
  {
    "id": "macro-calculator",
    "slug": "macro-calculator",
    "name": "Macro Calculator",
    "category": "Calories and nutrition",
    "title": "Macro Calculator | Free Online Calculator",
    "description": "Calculate daily protein, carbohydrate, and fat grams from calories and macro percentages.",
    "intro": "Calculate daily protein, carbohydrate, and fat grams from calories and macro percentages.",
    "resultExplanation": "The result explains the main macro calculator output based on the values you enter.",
    "formula": "grams = calories × macro percent / calories per gram",
    "fields": [
      {
        "id": "calories",
        "label": "Daily calories",
        "type": "number",
        "value": 2000
      },
      {
        "id": "protein",
        "label": "Protein percent",
        "type": "number",
        "value": 30
      },
      {
        "id": "carbs",
        "label": "Carb percent",
        "type": "number",
        "value": 40
      },
      {
        "id": "fat",
        "label": "Fat percent",
        "type": "number",
        "value": 30
      }
    ],
    "examples": [
      {
        "title": "Everyday example",
        "text": "Enter realistic values to use the macro calculator for school, work, home, or planning."
      },
      {
        "title": "Formula example",
        "text": "The calculator applies: grams = calories × macro percent / calories per gram."
      },
      {
        "title": "Review example",
        "text": "Use the result as a helpful estimate and verify important decisions when needed."
      }
    ],
    "useCases": [
      "School work",
      "Everyday planning",
      "Quick estimates",
      "Mobile calculations",
      "Reference checks",
      "Learning formulas"
    ],
    "faq": [
      [
        "What does the Macro Calculator do?",
        "Calculate daily protein, carbohydrate, and fat grams from calories and macro percentages."
      ],
      [
        "Is my data uploaded?",
        "No. The calculation runs in your browser on this static site."
      ],
      [
        "Can I use it on mobile?",
        "Yes. The calculator is responsive and keyboard accessible."
      ],
      [
        "Is the result exact?",
        "It follows the displayed formula, but rounding and assumptions may apply."
      ],
      [
        "Should I verify important results?",
        "Yes. Verify important results with official or professional sources."
      ]
    ],
    "related": [
      "bmi-calculator",
      "bmr-calculator",
      "calorie-calculator",
      "water-intake-calculator",
      "ideal-weight-calculator"
    ],
    "disclaimer": "This calculator is for general informational and educational purposes only. It is not medical advice, diagnosis, or treatment. Always consult a qualified healthcare professional for personal health questions."
  },
  {
    "id": "steps-to-calories-calculator",
    "slug": "steps-to-calories-calculator",
    "name": "Steps to Calories Calculator",
    "category": "Wellness",
    "title": "Steps to Calories Calculator | Free Online Calculator",
    "description": "Estimate calories burned from steps, body weight, and stride length.",
    "intro": "Estimate calories burned from steps, body weight, and stride length.",
    "resultExplanation": "The result explains the main steps to calories calculator output based on the values you enter.",
    "formula": "calories ≈ distance km × weight kg × 0.57",
    "fields": [
      {
        "id": "steps",
        "label": "Steps",
        "type": "number",
        "value": 10000
      },
      {
        "id": "weight",
        "label": "Weight kg",
        "type": "number",
        "value": 70
      },
      {
        "id": "stride",
        "label": "Stride length meters",
        "type": "number",
        "step": "any",
        "value": 0.75
      }
    ],
    "examples": [
      {
        "title": "Everyday example",
        "text": "Enter realistic values to use the steps to calories calculator for school, work, home, or planning."
      },
      {
        "title": "Formula example",
        "text": "The calculator applies: calories ≈ distance km × weight kg × 0.57."
      },
      {
        "title": "Review example",
        "text": "Use the result as a helpful estimate and verify important decisions when needed."
      }
    ],
    "useCases": [
      "School work",
      "Everyday planning",
      "Quick estimates",
      "Mobile calculations",
      "Reference checks",
      "Learning formulas"
    ],
    "faq": [
      [
        "What does the Steps to Calories Calculator do?",
        "Estimate calories burned from steps, body weight, and stride length."
      ],
      [
        "Is my data uploaded?",
        "No. The calculation runs in your browser on this static site."
      ],
      [
        "Can I use it on mobile?",
        "Yes. The calculator is responsive and keyboard accessible."
      ],
      [
        "Is the result exact?",
        "It follows the displayed formula, but rounding and assumptions may apply."
      ],
      [
        "Should I verify important results?",
        "Yes. Verify important results with official or professional sources."
      ]
    ],
    "related": [
      "bmi-calculator",
      "bmr-calculator",
      "calorie-calculator",
      "water-intake-calculator",
      "ideal-weight-calculator"
    ],
    "disclaimer": "This calculator is for general informational and educational purposes only. It is not medical advice, diagnosis, or treatment. Always consult a qualified healthcare professional for personal health questions."
  }
];
