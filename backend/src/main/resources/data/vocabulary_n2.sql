-- JLPT N2 Vocabulary Seed Data (100+ words across 6 categories)

-- ============================================================
-- Category: business (会社用語)
-- ============================================================
INSERT INTO vocabulary (kanji, furigana, english_meaning, part_of_speech, jlpt_level, frequency_rank, difficulty_level, example_sentence, sentence_english, category, word_formation, related_words, synonyms, antonyms) VALUES
('妥協', 'だきょう', 'compromise; give in', 'noun/verb', 'N2', 1, 3, '彼らは価格について妥協した。', 'They compromised on the price.', 'business', '妥（just）+ 協（cooperate）', '譲歩,交渉', '折り合い,歩み寄り', '固執,強硬'),
('把握', 'はあく', 'grasp; understand; comprehend', 'noun/verb', 'N2', 2, 3, '状況を把握してから行動してください。', 'Please act after grasping the situation.', 'business', '把（hold）+ 握（grip）', '理解,認識', '理解,掌握', '誤解,見落とし'),
('承認', 'しょうにん', 'approval; recognition; authorization', 'noun/verb', 'N2', 3, 3, '上司の承認が必要です。', 'We need the manager''s approval.', 'business', '承（receive）+ 認（recognize）', '許可,認可', '認可,許可', '却下,否認'),
('提案', 'ていあん', 'proposal; suggestion', 'noun/verb', 'N2', 4, 2, '新しい提案を検討してください。', 'Please consider the new proposal.', 'business', '提（present）+ 案（plan）', '提言,建議', '提言,申し出', '却下,反対'),
('徹底', 'てってい', 'thoroughness; exhaustiveness', 'noun/verb', 'N2', 5, 3, '安全対策を徹底する必要がある。', 'We need to be thorough with safety measures.', 'business', '徹（penetrate）+ 底（bottom）', '完全,完璧', '完全,徹頭徹尾', '不徹底,中途半端'),
('促進', 'そくしん', 'promotion; acceleration; facilitation', 'noun/verb', 'N2', 6, 3, 'プロジェクトの促進が必要だ。', 'We need to accelerate the project.', 'business', '促（urge）+ 進（advance）', '推進,加速', '推進,奨励', '抑制,阻害'),
('概要', 'がいよう', 'overview; summary; outline', 'noun', 'N2', 7, 3, '報告書の概要を説明してください。', 'Please explain the overview of the report.', 'business', '概（general）+ 要（essential）', '要約,概略', '要約,あらまし', '詳細,細部'),
('参照', 'さんしょう', 'reference; consultation', 'noun/verb', 'N2', 8, 2, '詳細は添付ファイルを参照してください。', 'Please refer to the attached file for details.', 'business', '参（compare）+ 照（illuminate）', '参考,照合', '参考,照合', '無視'),
('確認', 'かくにん', 'confirmation; verification; check', 'noun/verb', 'N2', 9, 2, '予約を確認してください。', 'Please confirm your reservation.', 'business', '確（certain）+ 認（recognize）', '確かめる,チェック', '照合,点検', '無視,見落とし'),
('施設', 'しせつ', 'facility; institution; establishment', 'noun', 'N2', 10, 2, 'この施設は最新設備を備えている。', 'This facility is equipped with the latest equipment.', 'business', '施（implement）+ 設（establish）', '設備,機関', '設備,機関', ''),
('効率', 'こうりつ', 'efficiency; effectiveness', 'noun', 'N2', 11, 2, '作業の効率を上げる必要がある。', 'We need to improve work efficiency.', 'business', '効（effect）+ 率（rate）', '能率,生産性', '能率', '非効率'),
('交渉', 'こうしょう', 'negotiation; talks', 'noun/verb', 'N2', 12, 3, '契約について交渉が続いている。', 'Negotiations about the contract are ongoing.', 'business', '交（exchange）+ 渉（wade）', '商談,折衝', '折衝,談判', '決裂'),
('契約', 'けいやく', 'contract; agreement', 'noun/verb', 'N2', 13, 2, '契約書に署名してください。', 'Please sign the contract.', 'business', '契（pledge）+ 約（promise）', '協定,合意', '協定,合意', '破棄,解除'),
('期限', 'きげん', 'deadline; time limit; expiration', 'noun', 'N2', 14, 2, '提出の期限は明日です。', 'The deadline for submission is tomorrow.', 'business', '期（period）+ 限（limit）', '締め切り,有効期限', '締め切り,期日', ''),
('方針', 'ほうしん', 'policy; course; direction', 'noun', 'N2', 15, 3, '会社の方針に従ってください。', 'Please follow the company policy.', 'business', '方（direction）+ 針（needle）', '指針,路線', '指針,方策', ''),
('実施', 'じっし', 'implementation; execution; enforcement', 'noun/verb', 'N2', 16, 2, '新制度を来月から実施します。', 'We will implement the new system starting next month.', 'business', '実（real）+ 施（implement）', '実行,施行', '実行,執行', '中止,廃止'),
('業務', 'ぎょうむ', 'business operations; work; duties', 'noun', 'N2', 17, 2, '日常業務をこなす必要がある。', 'We need to handle daily business operations.', 'business', '業（work）+ 務（duty）', '職務,仕事', '職務,任務', ''),
('対応', 'たいおう', 'response; correspondence; coping', 'noun/verb', 'N2', 18, 2, '顧客の問い合わせに対応する。', 'Respond to customer inquiries.', 'business', '対（opposite）+ 応（respond）', '対処,応対', '対処,措置', '無視,放置');

-- ============================================================
-- Category: academic (学術用語)
-- ============================================================
INSERT INTO vocabulary (kanji, furigana, english_meaning, part_of_speech, jlpt_level, frequency_rank, difficulty_level, example_sentence, sentence_english, category, word_formation, related_words, synonyms, antonyms) VALUES
('研究', 'けんきゅう', 'research; study; investigation', 'noun/verb', 'N2', 20, 2, '新薬の研究を進めている。', 'Research on new medicines is progressing.', 'academic', '研（polish）+ 究（exhaust）', '調査,探究', '調査,探究', ''),
('論文', 'ろんぶん', 'thesis; paper; dissertation', 'noun', 'N2', 21, 2, '卒業論文を書いている。', 'I am writing my graduation thesis.', 'academic', '論（theory）+ 文（writing）', 'レポート,論説', '論説', ''),
('分析', 'ぶんせき', 'analysis; breakdown', 'noun/verb', 'N2', 22, 3, 'データを分析する必要がある。', 'It is necessary to analyze the data.', 'academic', '分（divide）+ 析（split）', '解析,考察', '解析,解明', '合成'),
('仮説', 'かせつ', 'hypothesis; assumption', 'noun', 'N2', 23, 4, '仮説を立てて実験した。', 'We set up a hypothesis and experimented.', 'academic', '仮（temporary）+ 説（theory）', '理論,推論', '推論,仮定', '定理,事実'),
('証明', 'しょうめい', 'proof; evidence; verification', 'noun/verb', 'N2', 24, 3, '定理を証明する。', 'Prove the theorem.', 'academic', '証（evidence）+ 明（clear）', '立証,実証', '立証,実証', '反証'),
('観察', 'かんさつ', 'observation; watching; inspection', 'noun/verb', 'N2', 25, 2, '植物の成長を観察した。', 'We observed the growth of the plant.', 'academic', '観（view）+ 察（examine）', '観測,注視', '観測,見察', ''),
('実験', 'じっけん', 'experiment; test; trial', 'noun/verb', 'N2', 26, 2, '実験結果を報告書にまとめた。', 'We summarized the experimental results in a report.', 'academic', '実（actual）+ 験（test）', '試験,試み', '試験,テスト', ''),
('理論', 'りろん', 'theory; principle', 'noun', 'N2', 27, 3, '量子力学の理論は複雑だ。', 'Quantum mechanics theory is complex.', 'academic', '理（reason）+ 論（theory）', '学説,原理', '学説,原理', '実践,応用'),
('統計', 'とうけい', 'statistics; figures', 'noun', 'N2', 28, 3, '統計データを用いて分析した。', 'We analyzed using statistical data.', 'academic', '統（unify）+ 計（measure）', '数値,データ', 'データ', ''),
('成果', 'せいか', 'result; outcome; achievement; fruit', 'noun', 'N2', 29, 2, '研究の成果を発表した。', 'We announced the research results.', 'academic', '成（accomplish）+ 果（result）', '結果,成績', '結果,業績', '失敗'),
('課題', 'かだい', 'task; challenge; assignment; issue', 'noun', 'N2', 30, 2, '解決すべき課題が多い。', 'There are many issues to be resolved.', 'academic', '課（assign）+ 題（theme）', '問題,宿題', '問題,テーマ', '解決'),
('評価', 'ひょうか', 'evaluation; assessment; appraisal', 'noun/verb', 'N2', 31, 2, '作品を客観的に評価する。', 'Evaluate the work objectively.', 'academic', '評（critique）+ 価（value）', '査定,採点', '査定,格付け', ''),
('根拠', 'こんきょ', 'basis; ground; foundation; evidence', 'noun', 'N2', 32, 3, '主張の根拠を示してください。', 'Please show the basis for your argument.', 'academic', '根（root）+ 拠（basis）', '理由,証拠', '理由,証拠', ''),
('結論', 'けつろん', 'conclusion; decision', 'noun', 'N2', 33, 2, '実験から結論を導き出した。', 'We derived a conclusion from the experiment.', 'academic', '結（conclude）+ 論（theory）', '判断,決定', '判断,まとめ', '序論,前提'),
('目的', 'もくてき', 'purpose; objective; goal; aim', 'noun', 'N2', 34, 1, '研究の目的を明確にする。', 'Clarify the purpose of the research.', 'academic', '目（eye）+ 的（target）', '目標,狙い', '目標,目指すもの', '手段,過程'),
('影響', 'えいきょう', 'influence; effect; impact', 'noun/verb', 'N2', 35, 2, '環境問題が社会に影響を与える。', 'Environmental issues affect society.', 'academic', '影（shadow）+ 響（sound）', '作用,効果', '作用,インパクト', ''),
('比較', 'ひかく', 'comparison; contrast', 'noun/verb', 'N2', 36, 2, '二つの理論を比較した。', 'We compared two theories.', 'academic', '比（compare）+ 較（compare）', '対比,照合', '対比,対照', '');

-- ============================================================
-- Category: keigo (敬語)
-- ============================================================
INSERT INTO vocabulary (kanji, furigana, english_meaning, part_of_speech, jlpt_level, frequency_rank, difficulty_level, example_sentence, sentence_english, category, word_formation, related_words, synonyms, antonyms) VALUES
('拝見', 'はいけん', 'humble form of "to see/look at"', 'verb', 'N2', 40, 4, 'お手紙を拝見しました。', 'I humbly read your letter.', 'keigo', '拝（worship）+ 見（see）', '見る（humble）', 'お目通し', '拝聴'),
('申し上げる', 'もうしあげる', 'humble form of "to say/tell"', 'verb', 'N2', 41, 4, 'ご連絡申し上げます。', 'I humbly contact you.', 'keigo', '申す + 上げる（humble）', '言う（humble）', '申す', ''),
('いただく', 'いただく', 'humble form of "to receive/get"', 'verb', 'N2', 42, 3, 'ご意見をいただければ幸いです。', 'I would be grateful to receive your opinion.', 'keigo', '頂く（humble form）', 'もらう（humble）', 'ちょうだいする', '差し上げる'),
('存じる', 'ぞんじる', 'humble/formal form of "to know/think"', 'verb', 'N2', 43, 4, 'そのような事情とは存じませんでした。', 'I did not know about such circumstances.', 'keigo', '存（exist）+ じる（think）', '知る（humble）', '', ''),
('参る', 'まいる', 'humble form of "to go/come"', 'verb', 'N2', 44, 3, 'すぐに参ります。', 'I will come right away.', 'keigo', '参る（humble form）', '行く/来る（humble）', '', ''),
('おっしゃる', 'おっしゃる', 'honorific form of "to say"', 'verb', 'N2', 45, 3, '先生がおっしゃった通りです。', 'It is as the teacher said.', 'keigo', '言う（honorific）', '言う（honorific）', '', ''),
('いらっしゃる', 'いらっしゃる', 'honorific form of "to be/go/come"', 'verb', 'N2', 46, 3, '社長はいらっしゃいますか。', 'Is the president available?', 'keigo', 'いる/行く/来る（honorific）', '居る（honorific）', '', ''),
('なさる', 'なさる', 'honorific form of "to do"', 'verb', 'N2', 47, 3, 'ご確認をなさいましたか。', 'Have you confirmed it?', 'keigo', 'する（honorific）', 'する（honorific）', '', ''),
('頂戴', 'ちょうだい', 'humble form of receiving; please give', 'noun/verb', 'N2', 48, 3, 'お電話番号を頂戴できますか。', 'May I receive your phone number?', 'keigo', '頂（top）+ 戴（carry on head）', 'いただく', '', ''),
('ご覧', 'ごらん', 'honorific form of "to look/see"', 'noun/verb', 'N2', 49, 3, 'こちらをご覧ください。', 'Please look at this.', 'keigo', '御（honorific）+ 覧（look）', '見る（honorific）', '', ''),
('ご多忙', 'ごたぼう', 'being very busy (honorific)', 'noun', 'N2', 50, 3, 'ご多忙のところ恐れ入ります。', 'I am sorry to bother you when you are very busy.', 'keigo', '御（honorific）+ 多忙（busy）', '忙しい（honorific）', '', ''),
('恐縮', 'きょうしゅく', 'feeling obliged/grateful; sorry to trouble you', 'noun/verb', 'N2', 51, 4, 'ご返信いただき恐縮です。', 'I am grateful for your reply.', 'keigo', '恐（fear）+ 縮（shrink）', '申し訳ない,恐れ入る', '', '');

-- ============================================================
-- Category: daily_life (日常会話)
-- ============================================================
INSERT INTO vocabulary (kanji, furigana, english_meaning, part_of_speech, jlpt_level, frequency_rank, difficulty_level, example_sentence, sentence_english, category, word_formation, related_words, synonyms, antonyms) VALUES
('家賃', 'やちん', 'rent', 'noun', 'N2', 60, 2, '家賃を毎月払っている。', 'I pay rent every month.', 'daily_life', '家（house）+ 賃（wage/fee）', '賃料,家代', '賃料', ''),
('節約', 'せつやく', 'saving; economy; frugality', 'noun/verb', 'N2', 61, 2, '電気代を節約するために早く寝る。', 'I go to bed early to save on electricity.', 'daily_life', '節（section/save）+ 約（restrain）', '倹約,省エネ', '倹約,省エネ', '浪費,無駄遣い'),
('手続き', 'てつづき', 'procedure; process; formality', 'noun', 'N2', 62, 2, '引越しの手続きが複雑だ。', 'The moving procedures are complicated.', 'daily_life', '手（hand）+ 続き（continuation）', '手順,書類手続き', '手順', ''),
('趣味', 'しゅみ', 'hobby; interest; taste', 'noun', 'N2', 63, 1, '趣味は写真撮影です。', 'My hobby is photography.', 'daily_life', '趣（taste）+ 味（flavor）', '楽しみ,好み', '楽しみ,好み', ''),
('生活', 'せいかつ', 'life; living; livelihood', 'noun/verb', 'N2', 64, 1, '健康的な生活を心がけている。', 'I am mindful of living a healthy life.', 'daily_life', '生（live）+ 活（active）', '暮らし,日常', '暮らし,生計', ''),
('習慣', 'しゅうかん', 'habit; custom; practice', 'noun', 'N2', 65, 2, '早起きの習慣をつけた。', 'I have established a habit of waking up early.', 'daily_life', '習（practice）+ 慣（accustom）', '慣習,風習', '慣習,くせ', ''),
('近所', 'きんじょ', 'neighborhood; vicinity', 'noun', 'N2', 66, 1, '近所のスーパーで買い物をした。', 'I shopped at the neighborhood supermarket.', 'daily_life', '近（near）+ 所（place）', '周辺,隣近所', '周辺,付近', ''),
('家事', 'かじ', 'housework; household chores', 'noun', 'N2', 67, 2, '毎日家事をしている。', 'I do housework every day.', 'daily_life', '家（house）+ 事（matter）', '掃除,炊事', '炊事,洗濯', ''),
('記念', 'きねん', 'commemoration; anniversary; memorial', 'noun', 'N2', 68, 2, '結婚記念日を祝った。', 'We celebrated our wedding anniversary.', 'daily_life', '記（record）+ 念（thought）', '記念日,纪念品', '記念日', ''),
('相談', 'そうだん', 'consultation; discussion; advice', 'noun/verb', 'N2', 69, 1, '先生に相談した。', 'I consulted with my teacher.', 'daily_life', '相（mutual）+ 談（talk）', '相談,アドバイス', '協議,話し合い', ''),
('解決', 'かいけつ', 'solution; resolution; settlement', 'noun/verb', 'N2', 70, 2, '問題を解決する方法を見つけた。', 'We found a way to solve the problem.', 'daily_life', '解（untie）+ 決（decide）', '解消,処理', '解消,決着', '問題,未解決'),
('集中', 'しゅうちゅう', 'concentration; focus', 'noun/verb', 'N2', 71, 2, '勉強に集中できない。', 'I cannot concentrate on studying.', 'daily_life', '集（gather）+ 中（center）', '専念,没頭', '専念,没頭', '散漫,分散'),
('連絡', 'れんらく', 'contact; communication; connection', 'noun/verb', 'N2', 72, 1, '後で連絡します。', 'I will contact you later.', 'daily_life', '連（link）+ 絡（entwine）', '連絡,通知', '通知,知らせ', ''),
('準備', 'じゅんび', 'preparation; arrangements; readiness', 'noun/verb', 'N2', 73, 1, '試験の準備をしている。', 'I am preparing for the exam.', 'daily_life', '準（level）+ 備（prepare）', '用意,準備', '用意,整える', ''),
('利用', 'りよう', 'use; utilization; exploitation', 'noun/verb', 'N2', 74, 1, '公共交通機関を利用している。', 'I use public transportation.', 'daily_life', '利（benefit）+ 用（use）', '使用,活用', '使用,活用', ''),
('気分', 'きぶん', 'mood; feeling; condition', 'noun', 'N2', 75, 1, '今日は気分が良い。', 'I am in a good mood today.', 'daily_life', '気（spirit）+ 分（portion）', '気持ち,心持ち', '気持ち', '');

-- ============================================================
-- Category: idioms (ことわざ・慣用句)
-- ============================================================
INSERT INTO vocabulary (kanji, furigana, english_meaning, part_of_speech, jlpt_level, frequency_rank, difficulty_level, example_sentence, sentence_english, category, word_formation, related_words, synonyms, antonyms) VALUES
('一石二鳥', 'いっせきにちょう', 'killing two birds with one stone', 'idiom', 'N2', 80, 3, '運動しながら友達と話すのは一石二鳥だ。', 'Talking with friends while exercising kills two birds with one stone.', 'idioms', '一石（one stone）+ 二鳥（two birds）', '', '', ''),
('七転び八起き', 'ななころびやおき', 'fall down seven times, get up eight; perseverance', 'proverb', 'N2', 81, 3, '失敗しても七転び八起きの精神で続けよう。', 'Even if you fail, let''s continue with the spirit of getting up each time you fall.', 'idioms', '七（7）+ 転び（fall）+ 八（8）+ 起き（get up）', '不屈,根性', '', ''),
('急がば回れ', 'いそがばまわれ', 'more haste, less speed; if in a hurry, go around', 'proverb', 'N2', 82, 3, '急がば回れというから、しっかり準備してから始めよう。', 'As they say, more haste less speed, so let''s prepare thoroughly before starting.', 'idioms', '急ぐ（hurry）+ 回れ（go around）', '慎重,用心', '', ''),
('猫の手も借りたい', 'ねこのてもかりたい', 'so busy that one would borrow even a cat''s help', 'idiom', 'N2', 83, 4, '年末は猫の手も借りたいほど忙しい。', 'Year-end is so busy that we''d even borrow a cat''s help.', 'idioms', '猫（cat）+ 手（hand）+ 借りたい（want to borrow）', '多忙,てんてこ舞い', '', ''),
('頭を抱える', 'あたまをかかえる', 'to hold one''s head in one''s hands; to be at a loss', 'idiom', 'N2', 84, 3, '難しい問題に頭を抱えている。', 'I am at a loss with the difficult problem.', 'idioms', '頭（head）+ 抱える（hold）', '困る,悩む', '困る,悩む', ''),
('腹を割って', 'はらをわって', 'to speak frankly/openly; to open one''s heart', 'idiom', 'N2', 85, 4, '腹を割って話し合おう。', 'Let''s talk openly.', 'idioms', '腹（belly）+ 割る（split）', '率直,本音', '本音で,率直に', ''),
('手を貸す', 'てをかす', 'to lend a hand; to help', 'idiom', 'N2', 86, 2, '友達の引越しに手を貸した。', 'I lent a hand with my friend''s moving.', 'idioms', '手（hand）+ 貸す（lend）', '手伝う,助ける', '助ける,手伝う', ''),
('気を遣う', 'きをつかう', 'to be considerate; to take care; to worry', 'idiom', 'N2', 87, 2, '周りの人に気を遣う性格だ。', 'I have a personality that is considerate of those around me.', 'idioms', '気（spirit）+ 遣う（use）', '気配り,心遣い', '気配り', ''),
('目を向ける', 'めをむける', 'to turn one''s attention to; to look at', 'idiom', 'N2', 88, 2, '世界の問題に目を向ける必要がある。', 'We need to turn our attention to world problems.', 'idioms', '目（eye）+ 向ける（turn toward）', '注目する,関心を持つ', '注目する', ''),
('口を挟む', 'くちをはさむ', 'to interrupt; to butt in; to cut in', 'idiom', 'N2', 89, 3, '人の話に口を挟まないようにしよう。', 'Let''s try not to interrupt other people''s conversations.', 'idioms', '口（mouth）+ 挟む（insert）', '割り込む,介入する', '口出しする', ''),
('胸を張る', 'むねをはる', 'to hold one''s head high; to be proud', 'idiom', 'N2', 90, 3, '成果を胸を張って報告した。', 'I reported the results with pride.', 'idioms', '胸（chest）+ 張る（stretch）', '誇る,自慢する', '誇る', ''),
('水を向ける', 'みずをむける', 'to hint; to bring up a topic; to offer an invitation', 'idiom', 'N2', 91, 4, '転職について水を向けてみた。', 'I brought up the topic of changing jobs.', 'idioms', '水（water）+ 向ける（point）', 'ほのめかす,誘い水', '', '');

-- ============================================================
-- Category: kanji_compounds (漢字語)
-- ============================================================
INSERT INTO vocabulary (kanji, furigana, english_meaning, part_of_speech, jlpt_level, frequency_rank, difficulty_level, example_sentence, sentence_english, category, word_formation, related_words, synonyms, antonyms) VALUES
('複雑', 'ふくざつ', 'complex; complicated; intricate', 'adjective', 'N2', 100, 2, '状況が複雑になってきた。', 'The situation has become complex.', 'kanji_compounds', '複（double）+ 雑（mixed）', '難解,難しい', '難解,錯綜', '単純,簡単'),
('独立', 'どくりつ', 'independence; self-reliance', 'noun/verb', 'N2', 101, 2, '独立して会社を始めた。', 'I became independent and started a company.', 'kanji_compounds', '独（alone）+ 立（stand）', '自立,自主', '自立', '依存,従属'),
('協力', 'きょうりょく', 'cooperation; collaboration; support', 'noun/verb', 'N2', 102, 1, '皆の協力で成功した。', 'We succeeded thanks to everyone''s cooperation.', 'kanji_compounds', '協（cooperate）+ 力（power）', '連携,助け合い', '連携,共同', '対立,妨害'),
('可能', 'かのう', 'possible; feasible; potential', 'adjective/noun', 'N2', 103, 1, '様々な方法が可能だ。', 'Various methods are possible.', 'kanji_compounds', '可（can）+ 能（ability）', '実現可能,できる', 'できる,実現可能', '不可能,無理'),
('困難', 'こんなん', 'difficulty; hardship; trouble', 'noun/adjective', 'N2', 104, 2, '困難な状況を乗り越えた。', 'We overcame the difficult situation.', 'kanji_compounds', '困（troubled）+ 難（difficult）', '難しい,苦難', '難しい,苦労', '容易,簡単'),
('必要', 'ひつよう', 'necessary; essential; needed', 'adjective/noun', 'N2', 105, 1, '変化が必要だ。', 'Change is necessary.', 'kanji_compounds', '必（must）+ 要（need）', '不可欠,大切', '不可欠,要る', '不要,余分'),
('重要', 'じゅうよう', 'important; significant; crucial', 'adjective/noun', 'N2', 106, 1, 'これは重要な問題だ。', 'This is an important issue.', 'kanji_compounds', '重（heavy）+ 要（need）', '大切,肝心', '大切,肝心', '些細,些末'),
('発展', 'はってん', 'development; growth; expansion', 'noun/verb', 'N2', 107, 2, '技術が急速に発展している。', 'Technology is developing rapidly.', 'kanji_compounds', '発（emit）+ 展（spread）', '発達,成長', '発達,成長', '衰退,後退'),
('変化', 'へんか', 'change; transformation; variation', 'noun/verb', 'N2', 108, 1, '気候変化が問題になっている。', 'Climate change has become an issue.', 'kanji_compounds', '変（change）+ 化（transform）', '変動,転換', '変動,転変', '不変,安定'),
('管理', 'かんり', 'management; administration; control', 'noun/verb', 'N2', 109, 2, 'プロジェクトを管理している。', 'I am managing the project.', 'kanji_compounds', '管（pipe/manage）+ 理（reason）', '運営,監督', '運営,監督', '放任'),
('経験', 'けいけん', 'experience; practical knowledge', 'noun/verb', 'N2', 110, 1, '豊富な経験を持っている。', 'I have abundant experience.', 'kanji_compounds', '経（pass through）+ 験（examine）', '体験,経歴', '体験,体感', '未経験'),
('原因', 'げんいん', 'cause; origin; source', 'noun', 'N2', 111, 1, '問題の原因を調べている。', 'We are investigating the cause of the problem.', 'kanji_compounds', '原（original）+ 因（cause）', '理由,要因', '理由,要因', '結果,結末'),
('結果', 'けっか', 'result; consequence; outcome', 'noun', 'N2', 112, 1, '試験の結果が出た。', 'The exam results came out.', 'kanji_compounds', '結（conclude）+ 果（result）', '成果,帰結', '成果,帰結', '原因'),
('状況', 'じょうきょう', 'situation; circumstances; state of affairs', 'noun', 'N2', 113, 1, '現在の状況を説明してください。', 'Please explain the current situation.', 'kanji_compounds', '状（state）+ 況（condition）', '状態,情勢', '状態,情勢', ''),
('関係', 'かんけい', 'relationship; relation; connection', 'noun/verb', 'N2', 114, 1, '二つの問題は関係している。', 'The two problems are related.', 'kanji_compounds', '関（barrier/relate）+ 係（connection）', '関連,繋がり', '関連,つながり', '無関係'),
('判断', 'はんだん', 'judgment; decision; assessment', 'noun/verb', 'N2', 115, 2, '状況を見て判断する。', 'I will judge based on the situation.', 'kanji_compounds', '判（judge）+ 断（decide）', '決断,見極め', '決断,見極め', ''),
('維持', 'いじ', 'maintenance; preservation; keeping', 'noun/verb', 'N2', 116, 3, '良い関係を維持している。', 'We are maintaining good relations.', 'kanji_compounds', '維（preserve）+ 持（hold）', '保持,持続', '保持,保つ', '破壊,終了'),
('拡大', 'かくだい', 'expansion; enlargement; magnification', 'noun/verb', 'N2', 117, 2, '事業を拡大する計画がある。', 'There is a plan to expand the business.', 'kanji_compounds', '拡（expand）+ 大（large）', '拡張,増大', '拡張,増大', '縮小,縮小'),
('制限', 'せいげん', 'restriction; limitation; limit', 'noun/verb', 'N2', 118, 2, 'スピードに制限がある。', 'There is a speed limit.', 'kanji_compounds', '制（control）+ 限（limit）', '制約,限制', '制約,規制', '自由,無制限'),
('優先', 'ゆうせん', 'priority; preference; precedence', 'noun/verb', 'N2', 119, 2, '安全を優先する。', 'Safety takes priority.', 'kanji_compounds', '優（superior）+ 先（ahead）', '先決,最優先', '先決', '後回し'),
('連続', 'れんぞく', 'continuation; series; succession', 'noun/verb', 'N2', 120, 2, '三日連続で雨が降った。', 'It rained for three consecutive days.', 'kanji_compounds', '連（link）+ 続（continue）', '継続,続き', '継続,続く', '断絶,中断'),
('程度', 'ていど', 'degree; level; extent; standard', 'noun', 'N2', 121, 1, 'ある程度理解できた。', 'I was able to understand to a certain degree.', 'kanji_compounds', '程（extent）+ 度（degree）', '割合,レベル', '割合,水準', ''),
('全体', 'ぜんたい', 'whole; entirety; overall; total', 'noun', 'N2', 122, 1, '全体の流れを確認した。', 'I confirmed the overall flow.', 'kanji_compounds', '全（all）+ 体（body）', '全部,一体', '全部,すべて', '部分,一部'),
('具体的', 'ぐたいてき', 'concrete; specific; tangible', 'adjective', 'N2', 123, 2, '具体的な例を挙げてください。', 'Please give a concrete example.', 'kanji_compounds', '具体（concrete）+ 的（suffix）', '明確,具体,詳細', '明確,詳細', '抽象的'),
('効果的', 'こうかてき', 'effective; efficient', 'adjective', 'N2', 124, 2, '効果的な学習方法を探している。', 'I am looking for an effective learning method.', 'kanji_compounds', '効果（effect）+ 的（suffix）', '有効,効率的', '有効,効率的', '非効率,無効');
