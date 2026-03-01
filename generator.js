let ATTACK_LIBRARY = null;

async function initGenerator() {
    try {
        const res = await fetch('data/attack-library.json');
        if (!res.ok) throw new Error("Could not fetch attacks");
        ATTACK_LIBRARY = await res.json();
    } catch (e) {
        console.warn("Fetch failed (likely file:// protocol). Using local fallback data.");
        ATTACK_LIBRARY = {
            "attacks": {
                "authority": [
                    {
                        "id": "auth_01",
                        "name": "CBI Digital Arrest",
                        "channel": "whatsapp",
                        "template": "This is Sub-Inspector Rahul Verma from Cyber Crime Cell, New Delhi. A package in your name was intercepted at IGI Airport containing 3 fake passports and 200g narcotics. You are under Digital Arrest. Do NOT leave your room. Press 1 to connect with the investigating officer immediately. Non-compliance will result in physical arrest within 2 hours.",
                        "triggers_used": [
                            "authority",
                            "urgency"
                        ],
                        "red_flags": [
                            "Real CBI never contacts by WhatsApp",
                            "'Digital Arrest' is not a legal concept in India",
                            "Immediate action demand prevents rational thinking",
                            "Vague accusation designed to create panic"
                        ],
                        "psychological_breakdown": {
                            "authority": "Uniform + designation creates automatic compliance",
                            "urgency": "2-hour deadline bypasses your rational brain entirely"
                        },
                        "counter_tactic": "Real law enforcement sends written notice first. Hang up. Call 1930 (Cyber Crime Helpline) to verify."
                    },
                    {
                        "id": "auth_02",
                        "name": "Fake RBI UPI Block",
                        "channel": "sms",
                        "template": "Dear {name}, your UPI access via RBI directives will be blocked within 24 hours due to zero KYC status. Click here to verify your Aadhar at the RBI portal immediately: http://rbi-verify-kyc.in",
                        "triggers_used": [
                            "authority",
                            "urgency"
                        ],
                        "red_flags": [
                            "RBI does not manage individual consumer UPI accounts directly",
                            "Suspicious non-gov URL domain",
                            "Threat of blocking access"
                        ],
                        "psychological_breakdown": {
                            "authority": "Mentioning RBI forces compliance due to institutional fear",
                            "urgency": "24 hours limit forces quick clicks without verification"
                        },
                        "counter_tactic": "Never click links in SMS regarding KYC. Call your bank directly using the number on your debit card."
                    },
                    {
                        "id": "auth_03",
                        "name": "TRAI SIM Disconnect",
                        "channel": "whatsapp",
                        "template": "TRAI NOTICE: Your Aadhaar has been detected in 9 illegal numbers linked to money laundering. This main number will disconnected by TRAI in 2 hours. Press 9 to speak with TRAI officer immediately.",
                        "triggers_used": [
                            "authority",
                            "urgency"
                        ],
                        "red_flags": [
                            "TRAI does not disconnect numbers directly via WhatsApp robocalls",
                            "Demand to press a number connects to an impersonator"
                        ],
                        "psychological_breakdown": {
                            "authority": "Invokes the regulatory body to establish absolute authority",
                            "urgency": "Short timeframe disables critical thinking"
                        },
                        "counter_tactic": "Hang up. Check genuine registered connections on the official DoT 'Sanchar Saathi' portal."
                    },
                    {
                        "id": "auth_04",
                        "name": "Fake Professor Email",
                        "channel": "email",
                        "template": "Hello {name}, this is the Head of {dept} at {college}. I am in a board meeting and cannot take calls. I need you to arrange 5 Apple gift cards for a visiting delegation urgently. I will reimburse you by evening.",
                        "triggers_used": [
                            "authority",
                            "reciprocity"
                        ],
                        "red_flags": [
                            "Unusual request for gift cards",
                            "Claims to be unavailable by phone to prevent verification",
                            "Sent from a non-university email spoofing the name"
                        ],
                        "psychological_breakdown": {
                            "authority": "Uses the Head of Department role to compel obedience from a student",
                            "reciprocity": "Promises to pay back quickly to reduce perceived risk"
                        },
                        "counter_tactic": "Always verify unusual requests from authority figures via a known, secondary channel (like Slack or a phone call)."
                    },
                    {
                        "id": "auth_05",
                        "name": "Fake NPCI Officer",
                        "channel": "whatsapp",
                        "template": "NPCI Alert: {name}, an unauthorized transaction of ₹85,000 is pending on your account. I am the nodal officer. Share the 6-digit cancellation OTP sent to your phone to reverse the transaction immediately.",
                        "triggers_used": [
                            "authority",
                            "urgency"
                        ],
                        "red_flags": [
                            "NPCI officials do not contact retail customers individually",
                            "OTP is framed as a 'cancellation' code instead of an authorization code"
                        ],
                        "psychological_breakdown": {
                            "authority": "Claiming to be a nodal officer creates a sense of rescue from disaster",
                            "urgency": "Threat of losing large sum immediately forces hand"
                        },
                        "counter_tactic": "Never share OTPs. An OTP is meant for debiting, not reversing. Contact your home branch immediately."
                    }
                ],
                "urgency": [
                    {
                        "id": "urg_01",
                        "name": "UPI Block in 2 Hours",
                        "channel": "sms",
                        "template": "Dear User, your PhonePe/GPay UPI will be BLOCKED today. To continue using services without interruption, update your PAN immediately: bit.ly/upi-update-fast",
                        "triggers_used": [
                            "urgency"
                        ],
                        "red_flags": [
                            "Vague mention of 'PhonePe/GPay' instead of specific bank",
                            "Shortened bit.ly link",
                            "High-pressure timeframe"
                        ],
                        "psychological_breakdown": {
                            "urgency": "Creates fear of losing essential daily payments capability"
                        },
                        "counter_tactic": "Ignore SMS alerts with links. Open your actual UPI app to check if any alerts exist natively inside the app."
                    },
                    {
                        "id": "urg_02",
                        "name": "Exam Registration Closing",
                        "channel": "whatsapp",
                        "template": "URGENT for {college} students: The late registration portal for the semester finals closes in exactly 30 minutes! Pay the ₹1,500 fine now to generate your hall ticket: [link]",
                        "triggers_used": [
                            "urgency",
                            "authority"
                        ],
                        "red_flags": [
                            "Unreasonable 30-minute window for a critical academic task",
                            "Payment links sent via unverified WhatsApp"
                        ],
                        "psychological_breakdown": {
                            "urgency": "30 minutes is designed to trigger panic and override checking the official student portal"
                        },
                        "counter_tactic": "Do not panic. Log into the official university portal directly via browser to check actual deadlines."
                    },
                    {
                        "id": "urg_03",
                        "name": "Bank Account Freeze",
                        "channel": "email",
                        "template": "NOTICE: Suspicious activity detected on your account ending in XXXX. Your funds will be frozen in 1 hour if you do not verify your identity by clicking here.",
                        "triggers_used": [
                            "urgency"
                        ],
                        "red_flags": [
                            "Generic 'account ending in XXXX' without actual digits",
                            "Extremely short timeframe for response"
                        ],
                        "psychological_breakdown": {
                            "urgency": "Panic blocks logical evaluation of the sender address and generic details."
                        },
                        "counter_tactic": "Check your bank's official app. Call the bank directly. Real banks do not freeze with a 1-hour email warning."
                    },
                    {
                        "id": "urg_04",
                        "name": "Scholarship Deadline",
                        "channel": "whatsapp",
                        "template": "Hi {name}, your application for the National Merit Scholarship is incomplete! The portal shuts down tonight at midnight. Pay the ₹250 processing fee instantly to keep your application alive.",
                        "triggers_used": [
                            "urgency",
                            "scarcity"
                        ],
                        "red_flags": [
                            "Legitimate government scholarships do not require a processing fee at the last minute",
                            "Midnight deadlines are classic pressure tactics"
                        ],
                        "psychological_breakdown": {
                            "urgency": "Fear of missing out on a large sum of money over a small ₹250 fee."
                        },
                        "counter_tactic": "Verify deadlines on the official National Scholarship Portal (NSP). Do not pay processing fees to random links."
                    },
                    {
                        "id": "urg_05",
                        "name": "Electricity Disconnection",
                        "channel": "sms",
                        "template": "Dear consumer, your electricity power will be disconnected today night at 9.30 pm from the electricity office. Because your previous month bill was not updated. Please call our officer quickly: 98XXXXXX.",
                        "triggers_used": [
                            "urgency"
                        ],
                        "red_flags": [
                            "Poor grammar and generic 'electricity office'",
                            "Specific bizarre time (9.30 pm) creates artificial panic",
                            "Asking to call a private mobile number"
                        ],
                        "psychological_breakdown": {
                            "urgency": "The threat of immediate darkness/disconnection forces the victim to act defensively."
                        },
                        "counter_tactic": "Use official apps (like BESCOM/Tata Power) to check bill status. Disconnections require official written notices."
                    }
                ],
                "scarcity": [
                    {
                        "id": "sca_01",
                        "name": "Only 3 Google Seats",
                        "channel": "whatsapp",
                        "template": "Exclusive for {college}: We secured a backdoor entry for the Google Cloud Certification program. Only 3 seats left at a discounted rate of ₹999 instead of ₹10,000. Pay via UPI immediately to lock your seat.",
                        "triggers_used": [
                            "scarcity"
                        ],
                        "red_flags": [
                            "Google does not have 'backdoor entries'",
                            "Artificial limit of '3 seats'",
                            "Insisting on immediate UPI payment to an individual"
                        ],
                        "psychological_breakdown": {
                            "scarcity": "FOMO (Fear Of Missing Out) shuts down critical thinking by presenting a fleeting, high-value opportunity."
                        },
                        "counter_tactic": "Remember that if it sounds too good to be true, it is. Certifications are booked directly through official vendors."
                    },
                    {
                        "id": "sca_02",
                        "name": "Last Room in PG",
                        "channel": "whatsapp",
                        "template": "Hey {name}, I saw you're looking for a PG near {college}. I have one premium single room left, 5 other students want it. Send ₹2000 token advance right now or I give it to the next guy.",
                        "triggers_used": [
                            "scarcity",
                            "urgency"
                        ],
                        "red_flags": [
                            "Refusal to let you see the property first",
                            "High-pressure sales tactic for a 'token advance'"
                        ],
                        "psychological_breakdown": {
                            "scarcity": "The threat of losing out to generic competitors makes you risk money to secure a phantom asset."
                        },
                        "counter_tactic": "Never pay a deposit for housing without seeing it in person and verifying the owner/agent."
                    },
                    {
                        "id": "sca_03",
                        "name": "Limited Scholarship Slots",
                        "channel": "email",
                        "template": "Congratulations! You have been pre-selected for the {college} Excellence Grant. However, there are only 50 grants available and 200 applicants. Claim yours in the next 10 minutes by verifying your bank details.",
                        "triggers_used": [
                            "scarcity"
                        ],
                        "red_flags": [
                            "Contradictory information: pre-selected vs first-come-first-serve",
                            "Asking for bank details for 'verification' instead of standard forms"
                        ],
                        "psychological_breakdown": {
                            "scarcity": "Creating an artificial race induces rapid compliance without verification."
                        },
                        "counter_tactic": "Cross-check with your college's financial aid office. Legitimate grants are merit/need-based, not a race."
                    },
                    {
                        "id": "sca_04",
                        "name": "OTP Expires in 30s",
                        "channel": "sms",
                        "template": "Your one-time reward of ₹5,000 is ready. Your secret claim code is 8492. Warning: This offer expires in 30 seconds. Click [link] to claim.",
                        "triggers_used": [
                            "scarcity",
                            "urgency"
                        ],
                        "red_flags": [
                            "Absurdly short expiration time designed purely for panic",
                            "Random cash rewards for doing nothing"
                        ],
                        "psychological_breakdown": {
                            "scarcity": "The hyper-fast expiration creates blind panic to acquire the 'free' money before it disappears."
                        },
                        "counter_tactic": "Let the 30 seconds pass. Notice how nothing happens. It's a psychological trick."
                    },
                    {
                        "id": "sca_05",
                        "name": "First 10 Applicants Only",
                        "channel": "whatsapp",
                        "template": "Urgent casting call for a Netflix shoot near {college}. Daily pay is ₹5,000. We are only accepting the first 10 applicants who submit their ₹500 portfolio review fee. Hurry!",
                        "triggers_used": [
                            "scarcity",
                            "social_proof"
                        ],
                        "red_flags": [
                            "Legitimate casting agencies do not charge a 'portfolio review fee'",
                            "Mentioning a famous brand (Netflix) to build instant false credibility"
                        ],
                        "psychological_breakdown": {
                            "scarcity": "The 'First 10' rule makes people rush to part with their money to secure a dream job."
                        },
                        "counter_tactic": "Real jobs pay YOU. You do not pay them to get hired. Block the number."
                    }
                ],
                "social_proof": [
                    {
                        "id": "soc_01",
                        "name": "WhatsApp Group Pump & Dump",
                        "channel": "whatsapp",
                        "template": "Admin: 'The insider signal is live! Buy token X NOW!' \\nUser 1: 'Just bought ₹10k worth, already up 20%!'\\nUser 2: 'Thanks admin, making insane profits!'\\nJoin the wave, {name}, don't be the only one missing out!",
                        "triggers_used": [
                            "social_proof",
                            "scarcity"
                        ],
                        "red_flags": [
                            "Bots or accomplices hyping fake returns",
                            "Unregulated crypto/stock signals guarantee losses"
                        ],
                        "psychological_breakdown": {
                            "social_proof": "Seeing 'others' succeed creates a powerful urge to conform and trust the crowd."
                        },
                        "counter_tactic": "Recognize that group members are likely bots or accomplices. Never trade on WhatsApp tips."
                    },
                    {
                        "id": "soc_02",
                        "name": "Batchmates on Crypto App",
                        "channel": "whatsapp",
                        "template": "Hey {name}, over 45 students from {dept} have already registered on CoinSafe and claimed their free ₹1000 signup bonus. Join our private college community pool now!",
                        "triggers_used": [
                            "social_proof",
                            "liking"
                        ],
                        "red_flags": [
                            "Claiming a large specific number of your peers have done it",
                            "Using your department name to build false familiarity"
                        ],
                        "psychological_breakdown": {
                            "social_proof": "The illusion that your specific peer group is participating makes it feel safe."
                        },
                        "counter_tactic": "Ask your friends in person if they actually use the app. They likely don't."
                    },
                    {
                        "id": "soc_03",
                        "name": "Class Rep Fundraiser",
                        "channel": "whatsapp",
                        "template": "Guys, one of our seniors met with a terrible accident. The whole batch is chipping in. Already collected ₹40,000. Send whatever you can to this UPI ID immediately. Please do it for our community.",
                        "triggers_used": [
                            "social_proof",
                            "urgency",
                            "liking"
                        ],
                        "red_flags": [
                            "Unverified UPI ID not belonging to a known person or hospital",
                            "Emotional manipulation using the community identity"
                        ],
                        "psychological_breakdown": {
                            "social_proof": "The claim that 'the whole batch' is doing it makes you feel obligated to participate."
                        },
                        "counter_tactic": "Verify the accident and the collection account directly by calling actual class representatives."
                    },
                    {
                        "id": "soc_04",
                        "name": "Friends Already Applied",
                        "channel": "email",
                        "template": "Reminder: 8 of your mutual connections on LinkedIn from {college} have already applied to our fast-track Management Trainee program. Don't fall behind your peers. Pay the registration fee here.",
                        "triggers_used": [
                            "social_proof"
                        ],
                        "red_flags": [
                            "Vague 'mutual connections' without names",
                            "A legitimate job application should never require a fee"
                        ],
                        "psychological_breakdown": {
                            "social_proof": "Peer competition is leveraged to make you pay for a fake job application."
                        },
                        "counter_tactic": "Understand that 'fee for job' is always a scam. Valid companies absorb recruitment costs."
                    },
                    {
                        "id": "soc_05",
                        "name": "College Community Investment",
                        "channel": "whatsapp",
                        "template": "Welcome to the {college} passive income circle. Every week members pool ₹500 and get back ₹1500 through fixed match betting. See the screenshots above of everyone's winnings today!",
                        "triggers_used": [
                            "social_proof"
                        ],
                        "red_flags": [
                            "Fabricated screenshots of payments",
                            "Promises of guaranteed 300% returns"
                        ],
                        "psychological_breakdown": {
                            "social_proof": "Fake payment proofs create an illusion of consistent, community-wide success."
                        },
                        "counter_tactic": "Screenshots are easily faked. Guaranteed high returns on illegal betting rings are always a scam."
                    }
                ],
                "reciprocity": [
                    {
                        "id": "rec_01",
                        "name": "Fake App Testing Reward",
                        "channel": "email",
                        "template": "Hi {name}! You filled out our campus survey last month. As promised, here is your ₹500 Swiggy voucher. Please login with your Google account on this portal to claim it.",
                        "triggers_used": [
                            "reciprocity"
                        ],
                        "red_flags": [
                            "Vague reference to a past 'survey'",
                            "Requiring a Google login on a third-party non-Google site (Phishing)"
                        ],
                        "psychological_breakdown": {
                            "reciprocity": "You feel entitled to the reward for past work, making you lower your guard to claim it."
                        },
                        "counter_tactic": "Never enter Google credentials on random sites. A voucher should just be a code."
                    },
                    {
                        "id": "rec_02",
                        "name": "Free Coaching for Survey",
                        "channel": "whatsapp",
                        "template": "Hello {name}, thanks for attending our free seminar at {college}. As a return gift, we are offering you 1 month of premium CAT coaching absolutely free. Just pay ₹99 for server maintenance charges using this link.",
                        "triggers_used": [
                            "reciprocity"
                        ],
                        "red_flags": [
                            "A 'free' gift that requires you to pay money",
                            "Using a past minor interaction to create an obligation"
                        ],
                        "psychological_breakdown": {
                            "reciprocity": "The 'gift' makes you feel obligated, minimizing the perceived risk of the ₹99 fee (which steals card details)."
                        },
                        "counter_tactic": "True 'free' gifts have no strings attached. If you have to pay to get it, it's a scam."
                    },
                    {
                        "id": "rec_03",
                        "name": "Friend Needs Urgent Return",
                        "channel": "whatsapp",
                        "template": "Hey {name}, it's me. My old phone broke so I'm using this new number. Remember when I helped you out with those notes last semester? I'm at the hospital and need ₹2000 right now for medicines. Please GPay me.",
                        "triggers_used": [
                            "reciprocity",
                            "liking",
                            "urgency"
                        ],
                        "red_flags": [
                            "New unknown number claiming to be a friend",
                            "Guilt-tripping you over a past favor"
                        ],
                        "psychological_breakdown": {
                            "reciprocity": "Weaponizing a past favor to compel an emotional, unquestioning payment."
                        },
                        "counter_tactic": "Call the person on their ORIGINAL phone number. If they don't answer, ask them a question only they would know."
                    },
                    {
                        "id": "rec_04",
                        "name": "Referral Bonus Claim",
                        "channel": "sms",
                        "template": "Your friend referred you to our platform! They got ₹500, now it's your turn. Claim your ₹500 joining bonus by downloading our app APK here: [link]",
                        "triggers_used": [
                            "reciprocity",
                            "social_proof"
                        ],
                        "red_flags": [
                            "Downloading a malicious APK file outside the Play Store",
                            "Vague mention of 'a friend'"
                        ],
                        "psychological_breakdown": {
                            "reciprocity": "The feeling that someone did you a solid by referring you, so you must complete the transaction."
                        },
                        "counter_tactic": "Never download APK files sent via SMS. Only use official App Stores."
                    },
                    {
                        "id": "rec_05",
                        "name": "Free ₹500 for Feedback",
                        "channel": "whatsapp",
                        "template": "We are a food delivery startup expanding to {college}. Give us a 5-star rating on Google Maps and we will instantly transfer ₹500 to your UPI. Send a screenshot of your review to get paid!",
                        "triggers_used": [
                            "reciprocity"
                        ],
                        "red_flags": [
                            "Paying for fake reviews",
                            "The 'scam' is that once you send the screenshot, they demand an 'activation fee' to release the funds"
                        ],
                        "psychological_breakdown": {
                            "reciprocity": "They offer an easy task for high reward. Once you do the work, you feel invested and are easier to extort."
                        },
                        "counter_tactic": "Task-based scams always lead to them asking YOU for money eventually. Ignore them."
                    }
                ],
                "liking": [
                    {
                        "id": "lik_01",
                        "name": "Romantic UPI Transfer",
                        "channel": "whatsapp",
                        "template": "Hey, it was so nice chatting with you on Insta. You seem so genuine. I'm stuck at a petrol pump and my UPI is failing. Could you please scan this QR code and pay ₹400 for me? You have no idea how much this helps.",
                        "triggers_used": [
                            "liking"
                        ],
                        "red_flags": [
                            "Moving from a dating app/Insta to WhatsApp quickly",
                            "Immediate request for money due to an 'emergency'"
                        ],
                        "psychological_breakdown": {
                            "liking": "Exploiting your desire to impress or build a relationship with someone attractive."
                        },
                        "counter_tactic": "Never send money to someone you've only met online. Genuine people do not ask strangers for money."
                    },
                    {
                        "id": "lik_02",
                        "name": "Attractive Investor",
                        "channel": "whatsapp",
                        "template": "Hi {name}! I loved your profile. I actually run a small trading group where I teach people how to make passive income. Since I like your vibe, I'll let you in for free. Just register your wallet on this platform.",
                        "triggers_used": [
                            "liking",
                            "authority"
                        ],
                        "red_flags": [
                            "Unsolicited messages from 'attractive' strangers offering financial advice",
                            "Pushing you to unverified crypto/trading platforms"
                        ],
                        "psychological_breakdown": {
                            "liking": "Using charm, compliments, and an attractive profile photo to lower defenses (Pig Butchering scam)."
                        },
                        "counter_tactic": "Recognize that 'wrong number' or unsolicited flirty messages leading to finance talk are organized scams."
                    },
                    {
                        "id": "lik_03",
                        "name": "Friendly Senior with Opportunity",
                        "channel": "whatsapp",
                        "template": "Hey {name}, I graduated from {dept} two years ago. We have a discreet opening at my firm. You seem smart, so I'm bypassing the HR round for you. Send me your Aadhaar, PAN, and ₹1000 for the background check right now.",
                        "triggers_used": [
                            "liking",
                            "authority"
                        ],
                        "red_flags": [
                            "Bypassing official protocols 'just for you'",
                            "Asking a candidate to pay for their own background check via UPI"
                        ],
                        "psychological_breakdown": {
                            "liking": "Exploiting the inherent trust and camaraderie between students of the same college/department."
                        },
                        "counter_tactic": "Verify the senior's identity via official alumni networks or LinkedIn, and remember no legitimate job asks for money upfront."
                    },
                    {
                        "id": "lik_04",
                        "name": "Fan Asking for Help",
                        "channel": "instagram",
                        "template": "Omg {name}, I love your posts! I am participating in a photography contest for students at {college}. Can you please click this link and double-tap to vote for me? It would mean the world to me!",
                        "triggers_used": [
                            "liking"
                        ],
                        "red_flags": [
                            "Flattery used as a hook",
                            "Links that lead to fake Instagram login pages (credential harvesting)"
                        ],
                        "psychological_breakdown": {
                            "liking": "Flattery builds instant rapport, making the small request (clicking a link) seem harmless."
                        },
                        "counter_tactic": "Never log into social media through a link sent in a DM. If you want to vote, do it through the platform natively."
                    },
                    {
                        "id": "lik_05",
                        "name": "Long-Lost Schoolmate",
                        "channel": "whatsapp",
                        "template": "Hey is this {name}? It's Anjali from your old school! It's been so long. I actually just started a new boutique and I'm sending free samples to old friends. Just pay the ₹50 shipping fee via this link so I can courier it to you today!",
                        "triggers_used": [
                            "liking",
                            "reciprocity"
                        ],
                        "red_flags": [
                            "Phishing link disguised as a shipping fee payment",
                            "Pretending to be a vaguely remembered acquaintance"
                        ],
                        "psychological_breakdown": {
                            "liking": "Relying on politeness; you don't 'remember' them but feel too awkward to say no, so you comply."
                        },
                        "counter_tactic": "If a childhood friend's first interaction in 10 years is asking for money via a link, it's a compromised account or impersonator."
                    }
                ]
            }
        }
    }
}
window.initGenerator = initGenerator;

function generateAttackSimulations(profile, userContext) {
    if (!ATTACK_LIBRARY || !ATTACK_LIBRARY.attacks) return [];

    const top2 = profile.ranked.slice(0, 2);
    const simulations = [];

    top2.forEach(({ trigger }) => {
        let scenarios = ATTACK_LIBRARY.attacks[trigger] || [];
        if (scenarios.length === 0) return;

        // Pick scenario randomly
        const scenario = scenarios[Math.floor(Math.random() * scenarios.length)];

        // Personalize with user context
        const personalized = {
            ...scenario,
            message: scenario.template
                .replace(/{name}/g, userContext.name || "Student")
                .replace(/{college}/g, userContext.college || "your college")
                .replace(/{dept}/g, userContext.dept || "your department"),
        };

        simulations.push(personalized);
    });

    // Always add one from a different trigger for breadth if score > 30
    const tertiary = profile.ranked[2];
    if (tertiary && tertiary.score > 30) {
        let scenarios = ATTACK_LIBRARY.attacks[tertiary.trigger] || [];
        if (scenarios.length > 0) {
            const extra = scenarios[0];
            simulations.push({
                ...extra,
                message: extra.template
                    .replace(/{name}/g, userContext.name || "Student")
                    .replace(/{college}/g, userContext.college || "your college")
                    .replace(/{dept}/g, userContext.dept || "your department")
            });
        }
    }

    return simulations;
}
window.generateAttackSimulations = generateAttackSimulations;

async function enhanceWithAI(baseMessage, userContext) {
    try {
        const { pipeline } = await import("https://cdn.jsdelivr.net/npm/@xenova/transformers@2.17.2/dist/transformers.min.js");
        const generator = await pipeline("text2text-generation", "Xenova/flan-t5-small");

        const prompt = `Rewrite this scam message to sound more realistic. Make it feel personal and urgent. Keep it under 100 words. Original: ${baseMessage}`;

        const result = await generator(prompt, { max_length: 150 });
        return result[0].generated_text || baseMessage;
    } catch (e) {
        console.error("Transformers AI setup failed or blocked:", e);
        return baseMessage; // always fall back gracefully
    }
}
window.enhanceWithAI = enhanceWithAI;
