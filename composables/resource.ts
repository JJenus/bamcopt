import axios from "axios";

export const useAppResource = () => {
	const countries = useState<any[]>("form-countries", () => []);
	const country = useState<any>("user-country", () => {});
	countries.value = [
		{
			name: {
				common: "Cyprus",
				official: "Republic of Cyprus",
				nativeName: {
					ell: {
						official: "Δημοκρατία της Κύπρος",
						common: "Κύπρος",
					},
					tur: {
						official: "Kıbrıs Cumhuriyeti",
						common: "Kıbrıs",
					},
				},
			},
			altSpellings: [
				"CY",
				"Kýpros",
				"Kıbrıs",
				"Republic of Cyprus",
				"Κυπριακή Δημοκρατία",
				"Kıbrıs Cumhuriyeti",
			],
		},
		{
			name: {
				common: "Eritrea",
				official: "State of Eritrea",
				nativeName: {
					eng: {
						official: "State of Eritrea",
						common: "Eritrea",
					},
					tir: {
						official: "ሃገረ ኤርትራ",
						common: "ኤርትራ",
					},
				},
			},
			altSpellings: [
				"ER",
				"State of Eritrea",
				"ሃገረ ኤርትራ",
				"Dawlat Iritriyá",
				"ʾErtrā",
				"Iritriyā",
			],
		},
		{
			name: {
				common: "Liberia",
				official: "Republic of Liberia",
				nativeName: {
					eng: {
						official: "Republic of Liberia",
						common: "Liberia",
					},
				},
			},
			altSpellings: ["LR", "Republic of Liberia"],
		},
		{
			name: {
				common: "Bermuda",
				official: "Bermuda",
				nativeName: {
					eng: {
						official: "Bermuda",
						common: "Bermuda",
					},
				},
			},
			altSpellings: [
				"BM",
				"The Islands of Bermuda",
				"The Bermudas",
				"Somers Isles",
			],
		},
		{
			name: {
				common: "Vatican City",
				official: "Vatican City State",
				nativeName: {
					ita: {
						official: "Stato della Città del Vaticano",
						common: "Vaticano",
					},
					lat: {
						official: "Status Civitatis Vaticanæ",
						common: "Vaticanæ",
					},
				},
			},
			altSpellings: [
				"VA",
				"Holy See (Vatican City State)",
				"Vatican City State",
				"Stato della Città del Vaticano",
			],
		},
		{
			name: {
				common: "Cook Islands",
				official: "Cook Islands",
				nativeName: {
					eng: {
						official: "Cook Islands",
						common: "Cook Islands",
					},
					rar: {
						official: "Kūki 'Āirani",
						common: "Kūki 'Āirani",
					},
				},
			},
			altSpellings: ["CK", "Kūki 'Āirani"],
		},
		{
			name: {
				common: "Somalia",
				official: "Federal Republic of Somalia",
				nativeName: {
					ara: {
						official: "جمهورية الصومال‎‎",
						common: "الصومال‎‎",
					},
					som: {
						official: "Jamhuuriyadda Federaalka Soomaaliya",
						common: "Soomaaliya",
					},
				},
			},
			altSpellings: [
				"SO",
				"aṣ-Ṣūmāl",
				"Federal Republic of Somalia",
				"Jamhuuriyadda Federaalka Soomaaliya",
				"Jumhūriyyat aṣ-Ṣūmāl al-Fiderāliyya",
			],
		},
		{
			name: {
				common: "Zambia",
				official: "Republic of Zambia",
				nativeName: {
					eng: {
						official: "Republic of Zambia",
						common: "Zambia",
					},
				},
			},
			altSpellings: ["ZM", "Republic of Zambia"],
		},
		{
			name: {
				common: "Venezuela",
				official: "Bolivarian Republic of Venezuela",
				nativeName: {
					spa: {
						official: "República Bolivariana de Venezuela",
						common: "Venezuela",
					},
				},
			},
			altSpellings: [
				"VE",
				"Bolivarian Republic of Venezuela",
				"Venezuela, Bolivarian Republic of",
				"República Bolivariana de Venezuela",
			],
		},
		{
			name: {
				common: "Turkmenistan",
				official: "Turkmenistan",
				nativeName: {
					rus: {
						official: "Туркменистан",
						common: "Туркмения",
					},
					tuk: {
						official: "Türkmenistan",
						common: "Türkmenistan",
					},
				},
			},
			altSpellings: ["TM"],
		},
		{
			name: {
				common: "Albania",
				official: "Republic of Albania",
				nativeName: {
					sqi: {
						official: "Republika e Shqipërisë",
						common: "Shqipëria",
					},
				},
			},
			altSpellings: ["AL", "Shqipëri", "Shqipëria", "Shqipnia"],
		},
		{
			name: {
				common: "Croatia",
				official: "Republic of Croatia",
				nativeName: {
					hrv: {
						official: "Republika Hrvatska",
						common: "Hrvatska",
					},
				},
			},
			altSpellings: [
				"HR",
				"Hrvatska",
				"Republic of Croatia",
				"Republika Hrvatska",
			],
		},
		{
			name: {
				common: "United Kingdom",
				official:
					"United Kingdom of Great Britain and Northern Ireland",
				nativeName: {
					eng: {
						official:
							"United Kingdom of Great Britain and Northern Ireland",
						common: "United Kingdom",
					},
				},
			},
			altSpellings: ["GB", "UK", "Great Britain"],
		},
		{
			name: {
				common: "Sudan",
				official: "Republic of the Sudan",
				nativeName: {
					ara: {
						official: "جمهورية السودان",
						common: "السودان",
					},
					eng: {
						official: "Republic of the Sudan",
						common: "Sudan",
					},
				},
			},
			altSpellings: [
				"SD",
				"Republic of the Sudan",
				"Jumhūrīyat as-Sūdān",
			],
		},
		{
			name: {
				common: "Timor-Leste",
				official: "Democratic Republic of Timor-Leste",
				nativeName: {
					por: {
						official: "República Democrática de Timor-Leste",
						common: "Timor-Leste",
					},
					tet: {
						official: "Repúblika Demokrátika Timór-Leste",
						common: "Timór-Leste",
					},
				},
			},
			altSpellings: [
				"TL",
				"East Timor",
				"Democratic Republic of Timor-Leste",
				"República Democrática de Timor-Leste",
				"Repúblika Demokrátika Timór-Leste",
				"Timór Lorosa'e",
				"Timor Lorosae",
			],
		},
		{
			name: {
				common: "Republic of the Congo",
				official: "Republic of the Congo",
				nativeName: {
					fra: {
						official: "République du Congo",
						common: "République du Congo",
					},
					kon: {
						official: "Repubilika ya Kongo",
						common: "Repubilika ya Kongo",
					},
					lin: {
						official: "Republíki ya Kongó",
						common: "Republíki ya Kongó",
					},
				},
			},
			altSpellings: ["CG", "Congo", "Congo-Brazzaville"],
		},
		{
			name: {
				common: "Azerbaijan",
				official: "Republic of Azerbaijan",
				nativeName: {
					aze: {
						official: "Azərbaycan Respublikası",
						common: "Azərbaycan",
					},
				},
			},
			altSpellings: [
				"AZ",
				"Republic of Azerbaijan",
				"Azərbaycan Respublikası",
			],
		},
		{
			name: {
				common: "Kenya",
				official: "Republic of Kenya",
				nativeName: {
					eng: {
						official: "Republic of Kenya",
						common: "Kenya",
					},
					swa: {
						official: "Republic of Kenya",
						common: "Kenya",
					},
				},
			},
			altSpellings: ["KE", "Republic of Kenya", "Jamhuri ya Kenya"],
		},
		{
			name: {
				common: "American Samoa",
				official: "American Samoa",
				nativeName: {
					eng: {
						official: "American Samoa",
						common: "American Samoa",
					},
					smo: {
						official: "Sāmoa Amelika",
						common: "Sāmoa Amelika",
					},
				},
			},
			altSpellings: [
				"AS",
				"Amerika Sāmoa",
				"Amelika Sāmoa",
				"Sāmoa Amelika",
			],
		},
		{
			name: {
				common: "Ivory Coast",
				official: "Republic of Côte d'Ivoire",
				nativeName: {
					fra: {
						official: "République de Côte d'Ivoire",
						common: "Côte d'Ivoire",
					},
				},
			},
			altSpellings: [
				"CI",
				"Côte d'Ivoire",
				"Ivory Coast",
				"Republic of Côte d'Ivoire",
				"République de Côte d'Ivoire",
			],
		},
		{
			name: {
				common: "Senegal",
				official: "Republic of Senegal",
				nativeName: {
					fra: {
						official: "République du Sénégal",
						common: "Sénégal",
					},
				},
			},
			altSpellings: [
				"SN",
				"Republic of Senegal",
				"République du Sénégal",
			],
		},
		{
			name: {
				common: "Vietnam",
				official: "Socialist Republic of Vietnam",
				nativeName: {
					vie: {
						official: "Cộng hòa xã hội chủ nghĩa Việt Nam",
						common: "Việt Nam",
					},
				},
			},
			altSpellings: [
				"VN",
				"Socialist Republic of Vietnam",
				"Cộng hòa Xã hội chủ nghĩa Việt Nam",
				"Viet Nam",
			],
		},
		{
			name: {
				common: "El Salvador",
				official: "Republic of El Salvador",
				nativeName: {
					spa: {
						official: "República de El Salvador",
						common: "El Salvador",
					},
				},
			},
			altSpellings: [
				"SV",
				"Republic of El Salvador",
				"República de El Salvador",
			],
		},
		{
			name: {
				common: "Afghanistan",
				official: "Islamic Republic of Afghanistan",
				nativeName: {
					prs: {
						official: "جمهوری اسلامی افغانستان",
						common: "افغانستان",
					},
					pus: {
						official: "د افغانستان اسلامي جمهوریت",
						common: "افغانستان",
					},
					tuk: {
						official: "Owganystan Yslam Respublikasy",
						common: "Owganystan",
					},
				},
			},
			altSpellings: ["AF", "Afġānistān"],
		},
		{
			name: {
				common: "Saint Martin",
				official: "Saint Martin",
				nativeName: {
					fra: {
						official: "Saint-Martin",
						common: "Saint-Martin",
					},
				},
			},
			altSpellings: [
				"MF",
				"Collectivity of Saint Martin",
				"Collectivité de Saint-Martin",
				"Saint Martin (French part)",
			],
		},
		{
			name: {
				common: "Latvia",
				official: "Republic of Latvia",
				nativeName: {
					lav: {
						official: "Latvijas Republikas",
						common: "Latvija",
					},
				},
			},
			altSpellings: ["LV", "Republic of Latvia", "Latvijas Republika"],
		},
		{
			name: {
				common: "Guatemala",
				official: "Republic of Guatemala",
				nativeName: {
					spa: {
						official: "República de Guatemala",
						common: "Guatemala",
					},
				},
			},
			altSpellings: ["GT"],
		},
		{
			name: {
				common: "Kuwait",
				official: "State of Kuwait",
				nativeName: {
					ara: {
						official: "دولة الكويت",
						common: "الكويت",
					},
				},
			},
			altSpellings: ["KW", "State of Kuwait", "Dawlat al-Kuwait"],
		},
		{
			name: {
				common: "São Tomé and Príncipe",
				official: "Democratic Republic of São Tomé and Príncipe",
				nativeName: {
					por: {
						official:
							"República Democrática do São Tomé e Príncipe",
						common: "São Tomé e Príncipe",
					},
				},
			},
			altSpellings: [
				"ST",
				"Democratic Republic of São Tomé and Príncipe",
				"Sao Tome and Principe",
				"República Democrática de São Tomé e Príncipe",
			],
		},
		{
			name: {
				common: "Kyrgyzstan",
				official: "Kyrgyz Republic",
				nativeName: {
					kir: {
						official: "Кыргыз Республикасы",
						common: "Кыргызстан",
					},
					rus: {
						official: "Кыргызская Республика",
						common: "Киргизия",
					},
				},
			},
			altSpellings: [
				"KG",
				"Киргизия",
				"Kyrgyz Republic",
				"Кыргыз Республикасы",
				"Kyrgyz Respublikasy",
			],
		},
		{
			name: {
				common: "Poland",
				official: "Republic of Poland",
				nativeName: {
					pol: {
						official: "Rzeczpospolita Polska",
						common: "Polska",
					},
				},
			},
			altSpellings: ["PL", "Republic of Poland", "Rzeczpospolita Polska"],
		},
		{
			name: {
				common: "Guam",
				official: "Guam",
				nativeName: {
					cha: {
						official: "Guåhån",
						common: "Guåhån",
					},
					eng: {
						official: "Guam",
						common: "Guam",
					},
					spa: {
						official: "Guam",
						common: "Guam",
					},
				},
			},
			altSpellings: ["GU", "Guåhån"],
		},
		{
			name: {
				common: "Ghana",
				official: "Republic of Ghana",
				nativeName: {
					eng: {
						official: "Republic of Ghana",
						common: "Ghana",
					},
				},
			},
			altSpellings: ["GH"],
		},
		{
			name: {
				common: "Lithuania",
				official: "Republic of Lithuania",
				nativeName: {
					lit: {
						official: "Lietuvos Respublikos",
						common: "Lietuva",
					},
				},
			},
			altSpellings: [
				"LT",
				"Republic of Lithuania",
				"Lietuvos Respublika",
			],
		},
		{
			name: {
				common: "Armenia",
				official: "Republic of Armenia",
				nativeName: {
					hye: {
						official: "Հայաստանի Հանրապետություն",
						common: "Հայաստան",
					},
				},
			},
			altSpellings: [
				"AM",
				"Hayastan",
				"Republic of Armenia",
				"Հայաստանի Հանրապետություն",
			],
		},
		{
			name: {
				common: "Jersey",
				official: "Bailiwick of Jersey",
				nativeName: {
					eng: {
						official: "Bailiwick of Jersey",
						common: "Jersey",
					},
					fra: {
						official: "Bailliage de Jersey",
						common: "Jersey",
					},
					nrf: {
						official: "Bailliage dé Jèrri",
						common: "Jèrri",
					},
				},
			},
			altSpellings: [
				"JE",
				"Bailiwick of Jersey",
				"Bailliage de Jersey",
				"Bailliage dé Jèrri",
			],
		},
		{
			name: {
				common: "Grenada",
				official: "Grenada",
				nativeName: {
					eng: {
						official: "Grenada",
						common: "Grenada",
					},
				},
			},
			altSpellings: ["GD"],
		},
		{
			name: {
				common: "Tajikistan",
				official: "Republic of Tajikistan",
				nativeName: {
					rus: {
						official: "Республика Таджикистан",
						common: "Таджикистан",
					},
					tgk: {
						official: "Ҷумҳурии Тоҷикистон",
						common: "Тоҷикистон",
					},
				},
			},
			altSpellings: [
				"TJ",
				"Toçikiston",
				"Republic of Tajikistan",
				"Ҷумҳурии Тоҷикистон",
				"Çumhuriyi Toçikiston",
			],
		},
		{
			name: {
				common: "Ethiopia",
				official: "Federal Democratic Republic of Ethiopia",
				nativeName: {
					amh: {
						official: "የኢትዮጵያ ፌዴራላዊ ዲሞክራሲያዊ ሪፐብሊክ",
						common: "ኢትዮጵያ",
					},
				},
			},
			altSpellings: [
				"ET",
				"ʾĪtyōṗṗyā",
				"Federal Democratic Republic of Ethiopia",
				"የኢትዮጵያ ፌዴራላዊ ዲሞክራሲያዊ ሪፐብሊክ",
			],
		},
		{
			name: {
				common: "Western Sahara",
				official: "Sahrawi Arab Democratic Republic",
				nativeName: {
					ber: {
						official: "Sahrawi Arab Democratic Republic",
						common: "Western Sahara",
					},
					mey: {
						official: "الجمهورية العربية الصحراوية الديمقراطية",
						common: "الصحراء الغربية",
					},
					spa: {
						official: "República Árabe Saharaui Democrática",
						common: "Sahara Occidental",
					},
				},
			},
			altSpellings: ["EH", "Taneẓroft Tutrimt"],
		},
		{
			name: {
				common: "Morocco",
				official: "Kingdom of Morocco",
				nativeName: {
					ara: {
						official: "المملكة المغربية",
						common: "المغرب",
					},
					ber: {
						official: "ⵜⴰⴳⵍⴷⵉⵜ ⵏ ⵍⵎⵖⵔⵉⴱ",
						common: "ⵍⵎⴰⵖⵔⵉⴱ",
					},
				},
			},
			altSpellings: [
				"MA",
				"Kingdom of Morocco",
				"Al-Mamlakah al-Maġribiyah",
			],
		},
		{
			name: {
				common: "Puerto Rico",
				official: "Commonwealth of Puerto Rico",
				nativeName: {
					eng: {
						official: "Commonwealth of Puerto Rico",
						common: "Puerto Rico",
					},
					spa: {
						official: "Estado Libre Asociado de Puerto Rico",
						common: "Puerto Rico",
					},
				},
			},
			altSpellings: [
				"PR",
				"Commonwealth of Puerto Rico",
				"Estado Libre Asociado de Puerto Rico",
			],
		},
		{
			name: {
				common: "Christmas Island",
				official: "Territory of Christmas Island",
				nativeName: {
					eng: {
						official: "Territory of Christmas Island",
						common: "Christmas Island",
					},
				},
			},
			altSpellings: ["CX", "Territory of Christmas Island"],
		},
		{
			name: {
				common: "New Zealand",
				official: "New Zealand",
				nativeName: {
					eng: {
						official: "New Zealand",
						common: "New Zealand",
					},
					mri: {
						official: "Aotearoa",
						common: "Aotearoa",
					},
					nzs: {
						official: "New Zealand",
						common: "New Zealand",
					},
				},
			},
			altSpellings: ["NZ", "Aotearoa"],
		},
		{
			name: {
				common: "Brunei",
				official: "Nation of Brunei, Abode of Peace",
				nativeName: {
					msa: {
						official: "Nation of Brunei, Abode Damai",
						common: "Negara Brunei Darussalam",
					},
				},
			},
			altSpellings: [
				"BN",
				"Brunei Darussalam",
				"Nation of Brunei",
				"the Abode of Peace",
			],
		},
		{
			name: {
				common: "French Guiana",
				official: "Guiana",
				nativeName: {
					fra: {
						official: "Guyane",
						common: "Guyane française",
					},
				},
			},
			altSpellings: ["GF", "Guiana", "Guyane"],
		},
		{
			name: {
				common: "Niue",
				official: "Niue",
				nativeName: {
					eng: {
						official: "Niue",
						common: "Niue",
					},
					niu: {
						official: "Niuē",
						common: "Niuē",
					},
				},
			},
			altSpellings: ["NU"],
		},
		{
			name: {
				common: "Romania",
				official: "Romania",
				nativeName: {
					ron: {
						official: "România",
						common: "România",
					},
				},
			},
			altSpellings: ["RO", "Rumania", "Roumania", "România"],
		},
		{
			name: {
				common: "Svalbard and Jan Mayen",
				official: "Svalbard og Jan Mayen",
				nativeName: {
					nor: {
						official: "Svalbard og Jan Mayen",
						common: "Svalbard og Jan Mayen",
					},
				},
			},
			altSpellings: ["SJ", "Svalbard and Jan Mayen Islands"],
		},
		{
			name: {
				common: "Belarus",
				official: "Republic of Belarus",
				nativeName: {
					bel: {
						official: "Рэспубліка Беларусь",
						common: "Белару́сь",
					},
					rus: {
						official: "Республика Беларусь",
						common: "Беларусь",
					},
				},
			},
			altSpellings: [
				"BY",
				"Bielaruś",
				"Republic of Belarus",
				"Белоруссия",
				"Республика Белоруссия",
			],
		},
		{
			name: {
				common: "Panama",
				official: "Republic of Panama",
				nativeName: {
					spa: {
						official: "República de Panamá",
						common: "Panamá",
					},
				},
			},
			altSpellings: ["PA", "Republic of Panama", "República de Panamá"],
		},
		{
			name: {
				common: "Cameroon",
				official: "Republic of Cameroon",
				nativeName: {
					eng: {
						official: "Republic of Cameroon",
						common: "Cameroon",
					},
					fra: {
						official: "République du Cameroun",
						common: "Cameroun",
					},
				},
			},
			altSpellings: [
				"CM",
				"Republic of Cameroon",
				"République du Cameroun",
			],
		},
		{
			name: {
				common: "Czechia",
				official: "Czech Republic",
				nativeName: {
					ces: {
						official: "Česká republika",
						common: "Česko",
					},
					slk: {
						official: "Česká republika",
						common: "Česko",
					},
				},
			},
			altSpellings: ["CZ", "Česká republika", "Česko"],
		},
		{
			name: {
				common: "Saint Barthélemy",
				official: "Collectivity of Saint Barthélemy",
				nativeName: {
					fra: {
						official: "Collectivité de Saint-Barthélemy",
						common: "Saint-Barthélemy",
					},
				},
			},
			altSpellings: [
				"BL",
				"St. Barthelemy",
				"Collectivity of Saint Barthélemy",
				"Collectivité de Saint-Barthélemy",
			],
		},
		{
			name: {
				common: "Greece",
				official: "Hellenic Republic",
				nativeName: {
					ell: {
						official: "Ελληνική Δημοκρατία",
						common: "Ελλάδα",
					},
				},
			},
			altSpellings: [
				"GR",
				"Elláda",
				"Hellenic Republic",
				"Ελληνική Δημοκρατία",
			],
		},
		{
			name: {
				common: "Mali",
				official: "Republic of Mali",
				nativeName: {
					fra: {
						official: "République du Mali",
						common: "Mali",
					},
				},
			},
			altSpellings: ["ML", "Republic of Mali", "République du Mali"],
		},
		{
			name: {
				common: "Martinique",
				official: "Martinique",
				nativeName: {
					fra: {
						official: "Martinique",
						common: "Martinique",
					},
				},
			},
			altSpellings: ["MQ"],
		},
		{
			name: {
				common: "France",
				official: "French Republic",
				nativeName: {
					fra: {
						official: "République française",
						common: "France",
					},
				},
			},
			altSpellings: ["FR", "French Republic", "République française"],
		},
		{
			name: {
				common: "Pakistan",
				official: "Islamic Republic of Pakistan",
				nativeName: {
					eng: {
						official: "Islamic Republic of Pakistan",
						common: "Pakistan",
					},
					urd: {
						official: "اسلامی جمہوریۂ پاكستان",
						common: "پاكستان",
					},
				},
			},
			altSpellings: [
				"PK",
				"Pākistān",
				"Islamic Republic of Pakistan",
				"Islāmī Jumhūriya'eh Pākistān",
			],
		},
		{
			name: {
				common: "Peru",
				official: "Republic of Peru",
				nativeName: {
					aym: {
						official: "Piruw Suyu",
						common: "Piruw",
					},
					que: {
						official: "Piruw Ripuwlika",
						common: "Piruw",
					},
					spa: {
						official: "República del Perú",
						common: "Perú",
					},
				},
			},
			altSpellings: ["PE", "Republic of Peru", "República del Perú"],
		},
		{
			name: {
				common: "Barbados",
				official: "Barbados",
				nativeName: {
					eng: {
						official: "Barbados",
						common: "Barbados",
					},
				},
			},
			altSpellings: ["BB"],
		},
		{
			name: {
				common: "Greenland",
				official: "Greenland",
				nativeName: {
					kal: {
						official: "Kalaallit Nunaat",
						common: "Kalaallit Nunaat",
					},
				},
			},
			altSpellings: ["GL", "Grønland"],
		},
		{
			name: {
				common: "Saint Pierre and Miquelon",
				official: "Saint Pierre and Miquelon",
				nativeName: {
					fra: {
						official:
							"Collectivité territoriale de Saint-Pierre-et-Miquelon",
						common: "Saint-Pierre-et-Miquelon",
					},
				},
			},
			altSpellings: [
				"PM",
				"Collectivité territoriale de Saint-Pierre-et-Miquelon",
			],
		},
		{
			name: {
				common: "Chad",
				official: "Republic of Chad",
				nativeName: {
					ara: {
						official: "جمهورية تشاد",
						common: "تشاد‎",
					},
					fra: {
						official: "République du Tchad",
						common: "Tchad",
					},
				},
			},
			altSpellings: [
				"TD",
				"Tchad",
				"Republic of Chad",
				"République du Tchad",
			],
		},
		{
			name: {
				common: "Hungary",
				official: "Hungary",
				nativeName: {
					hun: {
						official: "Magyarország",
						common: "Magyarország",
					},
				},
			},
			altSpellings: ["HU"],
		},
		{
			name: {
				common: "Comoros",
				official: "Union of the Comoros",
				nativeName: {
					ara: {
						official: "الاتحاد القمري",
						common: "القمر‎",
					},
					fra: {
						official: "Union des Comores",
						common: "Comores",
					},
					zdj: {
						official: "Udzima wa Komori",
						common: "Komori",
					},
				},
			},
			altSpellings: [
				"KM",
				"Union of the Comoros",
				"Union des Comores",
				"Udzima wa Komori",
				"al-Ittiḥād al-Qumurī",
			],
		},
		{
			name: {
				common: "Bangladesh",
				official: "People's Republic of Bangladesh",
				nativeName: {
					ben: {
						official: "বাংলাদেশ গণপ্রজাতন্ত্রী",
						common: "বাংলাদেশ",
					},
				},
			},
			altSpellings: [
				"BD",
				"People's Republic of Bangladesh",
				"Gônôprôjatôntri Bangladesh",
			],
		},
		{
			name: {
				common: "Tokelau",
				official: "Tokelau",
				nativeName: {
					eng: {
						official: "Tokelau",
						common: "Tokelau",
					},
					smo: {
						official: "Tokelau",
						common: "Tokelau",
					},
					tkl: {
						official: "Tokelau",
						common: "Tokelau",
					},
				},
			},
			altSpellings: ["TK"],
		},
		{
			name: {
				common: "Fiji",
				official: "Republic of Fiji",
				nativeName: {
					eng: {
						official: "Republic of Fiji",
						common: "Fiji",
					},
					fij: {
						official: "Matanitu Tugalala o Viti",
						common: "Viti",
					},
					hif: {
						official: "रिपब्लिक ऑफ फीजी",
						common: "फिजी",
					},
				},
			},
			altSpellings: [
				"FJ",
				"Viti",
				"Republic of Fiji",
				"Matanitu ko Viti",
				"Fijī Gaṇarājya",
			],
		},
		{
			name: {
				common: "China",
				official: "People's Republic of China",
				nativeName: {
					zho: {
						official: "中华人民共和国",
						common: "中国",
					},
				},
			},
			altSpellings: [
				"CN",
				"Zhōngguó",
				"Zhongguo",
				"Zhonghua",
				"People's Republic of China",
				"中华人民共和国",
				"Zhōnghuá Rénmín Gònghéguó",
			],
		},
		{
			name: {
				common: "Colombia",
				official: "Republic of Colombia",
				nativeName: {
					spa: {
						official: "República de Colombia",
						common: "Colombia",
					},
				},
			},
			altSpellings: [
				"CO",
				"Republic of Colombia",
				"República de Colombia",
			],
		},
		{
			name: {
				common: "British Virgin Islands",
				official: "Virgin Islands",
				nativeName: {
					eng: {
						official: "Virgin Islands",
						common: "British Virgin Islands",
					},
				},
			},
			altSpellings: ["VG", "Virgin Islands, British"],
		},
		{
			name: {
				common: "Algeria",
				official: "People's Democratic Republic of Algeria",
				nativeName: {
					ara: {
						official: "الجمهورية الديمقراطية الشعبية الجزائرية",
						common: "الجزائر",
					},
				},
			},
			altSpellings: ["DZ", "Dzayer", "Algérie"],
		},
		{
			name: {
				common: "Maldives",
				official: "Republic of the Maldives",
				nativeName: {
					div: {
						official: "ދިވެހިރާއްޖޭގެ ޖުމްހޫރިއްޔާ",
						common: "ދިވެހިރާއްޖޭގެ",
					},
				},
			},
			altSpellings: [
				"MV",
				"Maldive Islands",
				"Republic of the Maldives",
				"Dhivehi Raajjeyge Jumhooriyya",
			],
		},
		{
			name: {
				common: "Malaysia",
				official: "Malaysia",
				nativeName: {
					eng: {
						official: "Malaysia",
						common: "Malaysia",
					},
					msa: {
						official: "مليسيا",
						common: "مليسيا",
					},
				},
			},
			altSpellings: ["MY"],
		},
		{
			name: {
				common: "Cayman Islands",
				official: "Cayman Islands",
				nativeName: {
					eng: {
						official: "Cayman Islands",
						common: "Cayman Islands",
					},
				},
			},
			altSpellings: ["KY"],
		},
		{
			name: {
				common: "Spain",
				official: "Kingdom of Spain",
				nativeName: {
					spa: {
						official: "Reino de España",
						common: "España",
					},
				},
			},
			altSpellings: ["ES", "Kingdom of Spain", "Reino de España"],
		},
		{
			name: {
				common: "Ireland",
				official: "Republic of Ireland",
				nativeName: {
					eng: {
						official: "Republic of Ireland",
						common: "Ireland",
					},
					gle: {
						official: "Poblacht na hÉireann",
						common: "Éire",
					},
				},
			},
			altSpellings: [
				"IE",
				"Éire",
				"Republic of Ireland",
				"Poblacht na hÉireann",
			],
		},
		{
			name: {
				common: "Estonia",
				official: "Republic of Estonia",
				nativeName: {
					est: {
						official: "Eesti Vabariik",
						common: "Eesti",
					},
				},
			},
			altSpellings: [
				"EE",
				"Eesti",
				"Republic of Estonia",
				"Eesti Vabariik",
			],
		},
		{
			name: {
				common: "Paraguay",
				official: "Republic of Paraguay",
				nativeName: {
					grn: {
						official: "Tetã Paraguái",
						common: "Paraguái",
					},
					spa: {
						official: "República de Paraguay",
						common: "Paraguay",
					},
				},
			},
			altSpellings: [
				"PY",
				"Republic of Paraguay",
				"República del Paraguay",
				"Tetã Paraguái",
			],
		},
		{
			name: {
				common: "Uruguay",
				official: "Oriental Republic of Uruguay",
				nativeName: {
					spa: {
						official: "República Oriental del Uruguay",
						common: "Uruguay",
					},
				},
			},
			altSpellings: [
				"UY",
				"Oriental Republic of Uruguay",
				"República Oriental del Uruguay",
			],
		},
		{
			name: {
				common: "South Africa",
				official: "Republic of South Africa",
				nativeName: {
					afr: {
						official: "Republiek van Suid-Afrika",
						common: "South Africa",
					},
					eng: {
						official: "Republic of South Africa",
						common: "South Africa",
					},
					nbl: {
						official: "IRiphabliki yeSewula Afrika",
						common: "Sewula Afrika",
					},
					nso: {
						official: "Rephaboliki ya Afrika-Borwa ",
						common: "Afrika-Borwa",
					},
					sot: {
						official: "Rephaboliki ya Afrika Borwa",
						common: "Afrika Borwa",
					},
					ssw: {
						official: "IRiphabhulikhi yeNingizimu Afrika",
						common: "Ningizimu Afrika",
					},
					tsn: {
						official: "Rephaboliki ya Aforika Borwa",
						common: "Aforika Borwa",
					},
					tso: {
						official: "Riphabliki ra Afrika Dzonga",
						common: "Afrika Dzonga",
					},
					ven: {
						official: "Riphabuḽiki ya Afurika Tshipembe",
						common: "Afurika Tshipembe",
					},
					xho: {
						official: "IRiphabliki yaseMzantsi Afrika",
						common: "Mzantsi Afrika",
					},
					zul: {
						official: "IRiphabliki yaseNingizimu Afrika",
						common: "Ningizimu Afrika",
					},
				},
			},
			altSpellings: [
				"ZA",
				"RSA",
				"Suid-Afrika",
				"Republic of South Africa",
			],
		},
		{
			name: {
				common: "Saint Lucia",
				official: "Saint Lucia",
				nativeName: {
					eng: {
						official: "Saint Lucia",
						common: "Saint Lucia",
					},
				},
			},
			altSpellings: ["LC"],
		},
		{
			name: {
				common: "Vanuatu",
				official: "Republic of Vanuatu",
				nativeName: {
					bis: {
						official: "Ripablik blong Vanuatu",
						common: "Vanuatu",
					},
					eng: {
						official: "Republic of Vanuatu",
						common: "Vanuatu",
					},
					fra: {
						official: "République de Vanuatu",
						common: "Vanuatu",
					},
				},
			},
			altSpellings: [
				"VU",
				"Republic of Vanuatu",
				"Ripablik blong Vanuatu",
				"République de Vanuatu",
			],
		},
		{
			name: {
				common: "Finland",
				official: "Republic of Finland",
				nativeName: {
					fin: {
						official: "Suomen tasavalta",
						common: "Suomi",
					},
					swe: {
						official: "Republiken Finland",
						common: "Finland",
					},
				},
			},
			altSpellings: [
				"FI",
				"Suomi",
				"Republic of Finland",
				"Suomen tasavalta",
				"Republiken Finland",
			],
		},
		{
			name: {
				common: "Sweden",
				official: "Kingdom of Sweden",
				nativeName: {
					swe: {
						official: "Konungariket Sverige",
						common: "Sverige",
					},
				},
			},
			altSpellings: ["SE", "Kingdom of Sweden", "Konungariket Sverige"],
		},
		{
			name: {
				common: "British Indian Ocean Territory",
				official: "British Indian Ocean Territory",
				nativeName: {
					eng: {
						official: "British Indian Ocean Territory",
						common: "British Indian Ocean Territory",
					},
				},
			},
			altSpellings: ["IO"],
		},
		{
			name: {
				common: "Lebanon",
				official: "Lebanese Republic",
				nativeName: {
					ara: {
						official: "الجمهورية اللبنانية",
						common: "لبنان",
					},
					fra: {
						official: "République libanaise",
						common: "Liban",
					},
				},
			},
			altSpellings: [
				"LB",
				"Lebanese Republic",
				"Al-Jumhūrīyah Al-Libnānīyah",
			],
		},
		{
			name: {
				common: "United States",
				official: "United States of America",
				nativeName: {
					eng: {
						official: "United States of America",
						common: "United States",
					},
				},
			},
			altSpellings: ["US", "USA", "United States of America"],
		},
		{
			name: {
				common: "Chile",
				official: "Republic of Chile",
				nativeName: {
					spa: {
						official: "República de Chile",
						common: "Chile",
					},
				},
			},
			altSpellings: ["CL", "Republic of Chile", "República de Chile"],
		},
		{
			name: {
				common: "Norfolk Island",
				official: "Territory of Norfolk Island",
				nativeName: {
					eng: {
						official: "Territory of Norfolk Island",
						common: "Norfolk Island",
					},
					pih: {
						official: "Teratri of Norf'k Ailen",
						common: "Norf'k Ailen",
					},
				},
			},
			altSpellings: [
				"NF",
				"Territory of Norfolk Island",
				"Teratri of Norf'k Ailen",
			],
		},
		{
			name: {
				common: "Montserrat",
				official: "Montserrat",
				nativeName: {
					eng: {
						official: "Montserrat",
						common: "Montserrat",
					},
				},
			},
			altSpellings: ["MS"],
		},
		{
			name: {
				common: "Australia",
				official: "Commonwealth of Australia",
				nativeName: {
					eng: {
						official: "Commonwealth of Australia",
						common: "Australia",
					},
				},
			},
			altSpellings: ["AU"],
		},
		{
			name: {
				common: "Belize",
				official: "Belize",
				nativeName: {
					bjz: {
						official: "Belize",
						common: "Belize",
					},
					eng: {
						official: "Belize",
						common: "Belize",
					},
					spa: {
						official: "Belice",
						common: "Belice",
					},
				},
			},
			altSpellings: ["BZ"],
		},
		{
			name: {
				common: "Guyana",
				official: "Co-operative Republic of Guyana",
				nativeName: {
					eng: {
						official: "Co-operative Republic of Guyana",
						common: "Guyana",
					},
				},
			},
			altSpellings: ["GY", "Co-operative Republic of Guyana"],
		},
		{
			name: {
				common: "Mongolia",
				official: "Mongolia",
				nativeName: {
					mon: {
						official: "Монгол улс",
						common: "Монгол улс",
					},
				},
			},
			altSpellings: ["MN"],
		},
		{
			name: {
				common: "Tuvalu",
				official: "Tuvalu",
				nativeName: {
					eng: {
						official: "Tuvalu",
						common: "Tuvalu",
					},
					tvl: {
						official: "Tuvalu",
						common: "Tuvalu",
					},
				},
			},
			altSpellings: ["TV"],
		},
		{
			name: {
				common: "Dominican Republic",
				official: "Dominican Republic",
				nativeName: {
					spa: {
						official: "República Dominicana",
						common: "República Dominicana",
					},
				},
			},
			altSpellings: ["DO"],
		},
		{
			name: {
				common: "Equatorial Guinea",
				official: "Republic of Equatorial Guinea",
				nativeName: {
					fra: {
						official: "République de la Guinée Équatoriale",
						common: "Guinée équatoriale",
					},
					por: {
						official: "República da Guiné Equatorial",
						common: "Guiné Equatorial",
					},
					spa: {
						official: "República de Guinea Ecuatorial",
						common: "Guinea Ecuatorial",
					},
				},
			},
			altSpellings: [
				"GQ",
				"Republic of Equatorial Guinea",
				"República de Guinea Ecuatorial",
				"République de Guinée équatoriale",
				"República da Guiné Equatorial",
			],
		},
		{
			name: {
				common: "Saint Kitts and Nevis",
				official: "Federation of Saint Christopher and Nevis",
				nativeName: {
					eng: {
						official: "Federation of Saint Christopher and Nevis",
						common: "Saint Kitts and Nevis",
					},
				},
			},
			altSpellings: ["KN", "Federation of Saint Christopher and Nevis"],
		},
		{
			name: {
				common: "Bolivia",
				official: "Plurinational State of Bolivia",
				nativeName: {
					aym: {
						official: "Wuliwya Suyu",
						common: "Wuliwya",
					},
					grn: {
						official: "Tetã Volívia",
						common: "Volívia",
					},
					que: {
						official: "Buliwya Mamallaqta",
						common: "Buliwya",
					},
					spa: {
						official: "Estado Plurinacional de Bolivia",
						common: "Bolivia",
					},
				},
			},
			altSpellings: [
				"BO",
				"Buliwya",
				"Wuliwya",
				"Bolivia, Plurinational State of",
				"Plurinational State of Bolivia",
				"Estado Plurinacional de Bolivia",
				"Buliwya Mamallaqta",
				"Wuliwya Suyu",
				"Tetã Volívia",
			],
		},
		{
			name: {
				common: "Nepal",
				official: "Federal Democratic Republic of Nepal",
				nativeName: {
					nep: {
						official: "नेपाल संघीय लोकतान्त्रिक गणतन्त्र",
						common: "नेपाल",
					},
				},
			},
			altSpellings: [
				"NP",
				"Federal Democratic Republic of Nepal",
				"Loktāntrik Ganatantra Nepāl",
			],
		},
		{
			name: {
				common: "French Southern and Antarctic Lands",
				official:
					"Territory of the French Southern and Antarctic Lands",
				nativeName: {
					fra: {
						official:
							"Territoire des Terres australes et antarctiques françaises",
						common: "Terres australes et antarctiques françaises",
					},
				},
			},
			altSpellings: ["TF", "French Southern Territories"],
		},
		{
			name: {
				common: "Taiwan",
				official: "Republic of China (Taiwan)",
				nativeName: {
					zho: {
						official: "中華民國",
						common: "台灣",
					},
				},
			},
			altSpellings: [
				"TW",
				"Táiwān",
				"Republic of China",
				"中華民國",
				"Zhōnghuá Mínguó",
				"Chinese Taipei",
			],
		},
		{
			name: {
				common: "Benin",
				official: "Republic of Benin",
				nativeName: {
					fra: {
						official: "République du Bénin",
						common: "Bénin",
					},
				},
			},
			altSpellings: ["BJ", "Republic of Benin", "République du Bénin"],
		},
		{
			name: {
				common: "Bulgaria",
				official: "Republic of Bulgaria",
				nativeName: {
					bul: {
						official: "Република България",
						common: "България",
					},
				},
			},
			altSpellings: ["BG", "Republic of Bulgaria", "Република България"],
		},
		{
			name: {
				common: "Moldova",
				official: "Republic of Moldova",
				nativeName: {
					ron: {
						official: "Republica Moldova",
						common: "Moldova",
					},
				},
			},
			altSpellings: [
				"MD",
				"Moldova, Republic of",
				"Republic of Moldova",
				"Republica Moldova",
			],
		},
		{
			name: {
				common: "Isle of Man",
				official: "Isle of Man",
				nativeName: {
					eng: {
						official: "Isle of Man",
						common: "Isle of Man",
					},
					glv: {
						official: "Ellan Vannin or Mannin",
						common: "Mannin",
					},
				},
			},
			altSpellings: ["IM", "Ellan Vannin", "Mann", "Mannin"],
		},
		{
			name: {
				common: "Bhutan",
				official: "Kingdom of Bhutan",
				nativeName: {
					dzo: {
						official: "འབྲུག་རྒྱལ་ཁབ་",
						common: "འབྲུག་ཡུལ་",
					},
				},
			},
			altSpellings: ["BT", "Kingdom of Bhutan"],
		},
		{
			name: {
				common: "Cambodia",
				official: "Kingdom of Cambodia",
				nativeName: {
					khm: {
						official: "ព្រះរាជាណាចក្រកម្ពុជា",
						common: "Kâmpŭchéa",
					},
				},
			},
			altSpellings: ["KH", "Kingdom of Cambodia"],
		},
		{
			name: {
				common: "Antigua and Barbuda",
				official: "Antigua and Barbuda",
				nativeName: {
					eng: {
						official: "Antigua and Barbuda",
						common: "Antigua and Barbuda",
					},
				},
			},
			altSpellings: ["AG"],
		},
		{
			name: {
				common: "Haiti",
				official: "Republic of Haiti",
				nativeName: {
					fra: {
						official: "République d'Haïti",
						common: "Haïti",
					},
					hat: {
						official: "Repiblik Ayiti",
						common: "Ayiti",
					},
				},
			},
			altSpellings: [
				"HT",
				"Republic of Haiti",
				"République d'Haïti",
				"Repiblik Ayiti",
			],
		},
		{
			name: {
				common: "Cape Verde",
				official: "Republic of Cabo Verde",
				nativeName: {
					por: {
						official: "República de Cabo Verde",
						common: "Cabo Verde",
					},
				},
			},
			altSpellings: [
				"CV",
				"Republic of Cabo Verde",
				"República de Cabo Verde",
			],
		},
		{
			name: {
				common: "Georgia",
				official: "Georgia",
				nativeName: {
					kat: {
						official: "საქართველო",
						common: "საქართველო",
					},
				},
			},
			altSpellings: ["GE", "Sakartvelo"],
		},
		{
			name: {
				common: "Burundi",
				official: "Republic of Burundi",
				nativeName: {
					fra: {
						official: "République du Burundi",
						common: "Burundi",
					},
					run: {
						official: "Republika y'Uburundi ",
						common: "Uburundi",
					},
				},
			},
			altSpellings: [
				"BI",
				"Republic of Burundi",
				"Republika y'Uburundi",
				"République du Burundi",
			],
		},
		{
			name: {
				common: "Bahamas",
				official: "Commonwealth of the Bahamas",
				nativeName: {
					eng: {
						official: "Commonwealth of the Bahamas",
						common: "Bahamas",
					},
				},
			},
			altSpellings: ["BS", "Commonwealth of the Bahamas"],
		},
		{
			name: {
				common: "Mauritius",
				official: "Republic of Mauritius",
				nativeName: {
					eng: {
						official: "Republic of Mauritius",
						common: "Mauritius",
					},
					fra: {
						official: "République de Maurice",
						common: "Maurice",
					},
					mfe: {
						official: "Republik Moris",
						common: "Moris",
					},
				},
			},
			altSpellings: [
				"MU",
				"Republic of Mauritius",
				"République de Maurice",
			],
		},
		{
			name: {
				common: "Libya",
				official: "State of Libya",
				nativeName: {
					ara: {
						official: "الدولة ليبيا",
						common: "‏ليبيا",
					},
				},
			},
			altSpellings: ["LY", "State of Libya", "Dawlat Libya"],
		},
		{
			name: {
				common: "Malawi",
				official: "Republic of Malawi",
				nativeName: {
					eng: {
						official: "Republic of Malawi",
						common: "Malawi",
					},
					nya: {
						official: "Chalo cha Malawi, Dziko la Malaŵi",
						common: "Malaŵi",
					},
				},
			},
			altSpellings: ["MW", "Republic of Malawi"],
		},
		{
			name: {
				common: "Mexico",
				official: "United Mexican States",
				nativeName: {
					spa: {
						official: "Estados Unidos Mexicanos",
						common: "México",
					},
				},
			},
			altSpellings: [
				"MX",
				"Mexicanos",
				"United Mexican States",
				"Estados Unidos Mexicanos",
			],
		},
		{
			name: {
				common: "Eswatini",
				official: "Kingdom of Eswatini",
				nativeName: {
					eng: {
						official: "Kingdom of Eswatini",
						common: "Eswatini",
					},
					ssw: {
						official: "Umbuso weSwatini",
						common: "eSwatini",
					},
				},
			},
			altSpellings: [
				"SZ",
				"Swaziland",
				"weSwatini",
				"Swatini",
				"Ngwane",
				"Kingdom of Eswatini",
				"Umbuso weSwatini",
			],
		},
		{
			name: {
				common: "Papua New Guinea",
				official: "Independent State of Papua New Guinea",
				nativeName: {
					eng: {
						official: "Independent State of Papua New Guinea",
						common: "Papua New Guinea",
					},
					hmo: {
						official: "Independen Stet bilong Papua Niugini",
						common: "Papua Niu Gini",
					},
					tpi: {
						official: "Independen Stet bilong Papua Niugini",
						common: "Papua Niugini",
					},
				},
			},
			altSpellings: [
				"PG",
				"Independent State of Papua New Guinea",
				"Independen Stet bilong Papua Niugini",
			],
		},
		{
			name: {
				common: "Dominica",
				official: "Commonwealth of Dominica",
				nativeName: {
					eng: {
						official: "Commonwealth of Dominica",
						common: "Dominica",
					},
				},
			},
			altSpellings: [
				"DM",
				"Dominique",
				"Wai‘tu kubuli",
				"Commonwealth of Dominica",
			],
		},
		{
			name: {
				common: "Liechtenstein",
				official: "Principality of Liechtenstein",
				nativeName: {
					deu: {
						official: "Fürstentum Liechtenstein",
						common: "Liechtenstein",
					},
				},
			},
			altSpellings: [
				"LI",
				"Principality of Liechtenstein",
				"Fürstentum Liechtenstein",
			],
		},
		{
			name: {
				common: "Russia",
				official: "Russian Federation",
				nativeName: {
					rus: {
						official: "Российская Федерация",
						common: "Россия",
					},
				},
			},
			altSpellings: ["RU", "Russian Federation", "Российская Федерация"],
		},
		{
			name: {
				common: "Israel",
				official: "State of Israel",
				nativeName: {
					ara: {
						official: "دولة إسرائيل",
						common: "إسرائيل",
					},
					heb: {
						official: "מדינת ישראל",
						common: "ישראל",
					},
				},
			},
			altSpellings: ["IL", "State of Israel", "Medīnat Yisrā'el"],
		},
		{
			name: {
				common: "Singapore",
				official: "Republic of Singapore",
				nativeName: {
					eng: {
						official: "Republic of Singapore",
						common: "Singapore",
					},
					zho: {
						official: "新加坡共和国",
						common: "新加坡",
					},
					msa: {
						official: "Republik Singapura",
						common: "Singapura",
					},
					tam: {
						official: "சிங்கப்பூர் குடியரசு",
						common: "சிங்கப்பூர்",
					},
				},
			},
			altSpellings: [
				"SG",
				"Singapura",
				"Republik Singapura",
				"新加坡共和国",
			],
		},
		{
			name: {
				common: "Uganda",
				official: "Republic of Uganda",
				nativeName: {
					eng: {
						official: "Republic of Uganda",
						common: "Uganda",
					},
					swa: {
						official: "Republic of Uganda",
						common: "Uganda",
					},
				},
			},
			altSpellings: ["UG", "Republic of Uganda", "Jamhuri ya Uganda"],
		},
		{
			name: {
				common: "Slovakia",
				official: "Slovak Republic",
				nativeName: {
					slk: {
						official: "Slovenská republika",
						common: "Slovensko",
					},
				},
			},
			altSpellings: ["SK", "Slovak Republic", "Slovenská republika"],
		},
		{
			name: {
				common: "Tonga",
				official: "Kingdom of Tonga",
				nativeName: {
					eng: {
						official: "Kingdom of Tonga",
						common: "Tonga",
					},
					ton: {
						official: "Kingdom of Tonga",
						common: "Tonga",
					},
				},
			},
			altSpellings: ["TO"],
		},
		{
			name: {
				common: "United Arab Emirates",
				official: "United Arab Emirates",
				nativeName: {
					ara: {
						official: "الإمارات العربية المتحدة",
						common: "دولة الإمارات العربية المتحدة",
					},
				},
			},
			altSpellings: ["AE", "UAE", "Emirates"],
		},
		{
			name: {
				common: "Mayotte",
				official: "Department of Mayotte",
				nativeName: {
					fra: {
						official: "Département de Mayotte",
						common: "Mayotte",
					},
				},
			},
			altSpellings: [
				"YT",
				"Department of Mayotte",
				"Département de Mayotte",
			],
		},
		{
			name: {
				common: "Suriname",
				official: "Republic of Suriname",
				nativeName: {
					nld: {
						official: "Republiek Suriname",
						common: "Suriname",
					},
				},
			},
			altSpellings: [
				"SR",
				"Sarnam",
				"Sranangron",
				"Republic of Suriname",
				"Republiek Suriname",
			],
		},
		{
			name: {
				common: "Uzbekistan",
				official: "Republic of Uzbekistan",
				nativeName: {
					rus: {
						official: "Республика Узбекистан",
						common: "Узбекистан",
					},
					uzb: {
						official: "O'zbekiston Respublikasi",
						common: "O‘zbekiston",
					},
				},
			},
			altSpellings: [
				"UZ",
				"Republic of Uzbekistan",
				"O‘zbekiston Respublikasi",
				"Ўзбекистон Республикаси",
			],
		},
		{
			name: {
				common: "Saudi Arabia",
				official: "Kingdom of Saudi Arabia",
				nativeName: {
					ara: {
						official: "المملكة العربية السعودية",
						common: "العربية السعودية",
					},
				},
			},
			altSpellings: [
				"Saudi",
				"SA",
				"Kingdom of Saudi Arabia",
				"Al-Mamlakah al-‘Arabiyyah as-Su‘ūdiyyah",
			],
		},
		{
			name: {
				common: "Egypt",
				official: "Arab Republic of Egypt",
				nativeName: {
					ara: {
						official: "جمهورية مصر العربية",
						common: "مصر",
					},
				},
			},
			altSpellings: ["EG", "Arab Republic of Egypt"],
		},
		{
			name: {
				common: "Italy",
				official: "Italian Republic",
				nativeName: {
					ita: {
						official: "Repubblica italiana",
						common: "Italia",
					},
				},
			},
			altSpellings: ["IT", "Italian Republic", "Repubblica italiana"],
		},
		{
			name: {
				common: "Madagascar",
				official: "Republic of Madagascar",
				nativeName: {
					fra: {
						official: "République de Madagascar",
						common: "Madagascar",
					},
					mlg: {
						official: "Repoblikan'i Madagasikara",
						common: "Madagasikara",
					},
				},
			},
			altSpellings: [
				"MG",
				"Republic of Madagascar",
				"Repoblikan'i Madagasikara",
				"République de Madagascar",
			],
		},
		{
			name: {
				common: "New Caledonia",
				official: "New Caledonia",
				nativeName: {
					fra: {
						official: "Nouvelle-Calédonie",
						common: "Nouvelle-Calédonie",
					},
				},
			},
			altSpellings: ["NC"],
		},
		{
			name: {
				common: "Canada",
				official: "Canada",
				nativeName: {
					eng: {
						official: "Canada",
						common: "Canada",
					},
					fra: {
						official: "Canada",
						common: "Canada",
					},
				},
			},
			altSpellings: ["CA"],
		},
		{
			name: {
				common: "United States Virgin Islands",
				official: "Virgin Islands of the United States",
				nativeName: {
					eng: {
						official: "Virgin Islands of the United States",
						common: "United States Virgin Islands",
					},
				},
			},
			altSpellings: ["VI", "Virgin Islands, U.S."],
		},
		{
			name: {
				common: "Marshall Islands",
				official: "Republic of the Marshall Islands",
				nativeName: {
					eng: {
						official: "Republic of the Marshall Islands",
						common: "Marshall Islands",
					},
					mah: {
						official: "Republic of the Marshall Islands",
						common: "M̧ajeļ",
					},
				},
			},
			altSpellings: [
				"MH",
				"Republic of the Marshall Islands",
				"Aolepān Aorōkin M̧ajeļ",
			],
		},
		{
			name: {
				common: "Mauritania",
				official: "Islamic Republic of Mauritania",
				nativeName: {
					ara: {
						official: "الجمهورية الإسلامية الموريتانية",
						common: "موريتانيا",
					},
				},
			},
			altSpellings: [
				"MR",
				"Islamic Republic of Mauritania",
				"al-Jumhūriyyah al-ʾIslāmiyyah al-Mūrītāniyyah",
			],
		},
		{
			name: {
				common: "Gambia",
				official: "Republic of the Gambia",
				nativeName: {
					eng: {
						official: "Republic of the Gambia",
						common: "Gambia",
					},
				},
			},
			altSpellings: ["GM", "Republic of the Gambia"],
		},
		{
			name: {
				common: "Trinidad and Tobago",
				official: "Republic of Trinidad and Tobago",
				nativeName: {
					eng: {
						official: "Republic of Trinidad and Tobago",
						common: "Trinidad and Tobago",
					},
				},
			},
			altSpellings: ["TT", "Republic of Trinidad and Tobago"],
		},
		{
			name: {
				common: "Seychelles",
				official: "Republic of Seychelles",
				nativeName: {
					crs: {
						official: "Repiblik Sesel",
						common: "Sesel",
					},
					eng: {
						official: "Republic of Seychelles",
						common: "Seychelles",
					},
					fra: {
						official: "République des Seychelles",
						common: "Seychelles",
					},
				},
			},
			altSpellings: [
				"SC",
				"Republic of Seychelles",
				"Repiblik Sesel",
				"République des Seychelles",
			],
		},
		{
			name: {
				common: "Japan",
				official: "Japan",
				nativeName: {
					jpn: {
						official: "日本",
						common: "日本",
					},
				},
			},
			altSpellings: ["JP", "Nippon", "Nihon"],
		},
		{
			name: {
				common: "Brazil",
				official: "Federative Republic of Brazil",
				nativeName: {
					por: {
						official: "República Federativa do Brasil",
						common: "Brasil",
					},
				},
			},
			altSpellings: [
				"BR",
				"Brasil",
				"Federative Republic of Brazil",
				"República Federativa do Brasil",
			],
		},
		{
			name: {
				common: "Syria",
				official: "Syrian Arab Republic",
				nativeName: {
					ara: {
						official: "الجمهورية العربية السورية",
						common: "سوريا",
					},
				},
			},
			altSpellings: [
				"SY",
				"Syrian Arab Republic",
				"Al-Jumhūrīyah Al-ʻArabīyah As-Sūrīyah",
			],
		},
		{
			name: {
				common: "Saint Helena, Ascension and Tristan da Cunha",
				official: "Saint Helena, Ascension and Tristan da Cunha",
				nativeName: {
					eng: {
						official:
							"Saint Helena, Ascension and Tristan da Cunha",
						common: "Saint Helena, Ascension and Tristan da Cunha",
					},
				},
			},
			altSpellings: [
				"Saint Helena",
				"St. Helena, Ascension and Tristan da Cunha",
			],
		},
		{
			name: {
				common: "Tanzania",
				official: "United Republic of Tanzania",
				nativeName: {
					eng: {
						official: "United Republic of Tanzania",
						common: "Tanzania",
					},
					swa: {
						official: "Jamhuri ya Muungano wa Tanzania",
						common: "Tanzania",
					},
				},
			},
			altSpellings: [
				"TZ",
				"Tanzania, United Republic of",
				"United Republic of Tanzania",
				"Jamhuri ya Muungano wa Tanzania",
			],
		},
		{
			name: {
				common: "Andorra",
				official: "Principality of Andorra",
				nativeName: {
					cat: {
						official: "Principat d'Andorra",
						common: "Andorra",
					},
				},
			},
			altSpellings: [
				"AD",
				"Principality of Andorra",
				"Principat d'Andorra",
			],
		},
		{
			name: {
				common: "Iran",
				official: "Islamic Republic of Iran",
				nativeName: {
					fas: {
						official: "جمهوری اسلامی ایران",
						common: "ایران",
					},
				},
			},
			altSpellings: [
				"IR",
				"Islamic Republic of Iran",
				"Iran, Islamic Republic of",
				"Jomhuri-ye Eslāmi-ye Irān",
			],
		},
		{
			name: {
				common: "Togo",
				official: "Togolese Republic",
				nativeName: {
					fra: {
						official: "République togolaise",
						common: "Togo",
					},
				},
			},
			altSpellings: [
				"TG",
				"Togolese",
				"Togolese Republic",
				"République Togolaise",
			],
		},
		{
			name: {
				common: "Malta",
				official: "Republic of Malta",
				nativeName: {
					eng: {
						official: "Republic of Malta",
						common: "Malta",
					},
					mlt: {
						official: "Repubblika ta ' Malta",
						common: "Malta",
					},
				},
			},
			altSpellings: ["MT", "Republic of Malta", "Repubblika ta' Malta"],
		},
		{
			name: {
				common: "South Korea",
				official: "Republic of Korea",
				nativeName: {
					kor: {
						official: "대한민국",
						common: "한국",
					},
				},
			},
			altSpellings: [
				"KR",
				"Korea, Republic of",
				"Republic of Korea",
				"남한",
				"남조선",
			],
		},
		{
			name: {
				common: "Samoa",
				official: "Independent State of Samoa",
				nativeName: {
					eng: {
						official: "Independent State of Samoa",
						common: "Samoa",
					},
					smo: {
						official: "Malo Saʻoloto Tutoʻatasi o Sāmoa",
						common: "Sāmoa",
					},
				},
			},
			altSpellings: [
				"WS",
				"Independent State of Samoa",
				"Malo Saʻoloto Tutoʻatasi o Sāmoa",
			],
		},
		{
			name: {
				common: "Germany",
				official: "Federal Republic of Germany",
				nativeName: {
					deu: {
						official: "Bundesrepublik Deutschland",
						common: "Deutschland",
					},
				},
			},
			altSpellings: [
				"DE",
				"Federal Republic of Germany",
				"Bundesrepublik Deutschland",
			],
		},
		{
			name: {
				common: "Niger",
				official: "Republic of Niger",
				nativeName: {
					fra: {
						official: "République du Niger",
						common: "Niger",
					},
				},
			},
			altSpellings: ["NE", "Nijar"],
		},
		{
			name: {
				common: "Bouvet Island",
				official: "Bouvet Island",
				nativeName: {
					nor: {
						official: "Bouvetøya",
						common: "Bouvetøya",
					},
				},
			},
			altSpellings: ["BV", "Bouvetøya", "Bouvet-øya"],
		},
		{
			name: {
				common: "Jamaica",
				official: "Jamaica",
				nativeName: {
					eng: {
						official: "Jamaica",
						common: "Jamaica",
					},
					jam: {
						official: "Jamaica",
						common: "Jamaica",
					},
				},
			},
			altSpellings: ["JM"],
		},
		{
			name: {
				common: "Nicaragua",
				official: "Republic of Nicaragua",
				nativeName: {
					spa: {
						official: "República de Nicaragua",
						common: "Nicaragua",
					},
				},
			},
			altSpellings: [
				"NI",
				"Republic of Nicaragua",
				"República de Nicaragua",
			],
		},
		{
			name: {
				common: "Guinea",
				official: "Republic of Guinea",
				nativeName: {
					fra: {
						official: "République de Guinée",
						common: "Guinée",
					},
				},
			},
			altSpellings: ["GN", "Republic of Guinea", "République de Guinée"],
		},
		{
			name: {
				common: "Anguilla",
				official: "Anguilla",
				nativeName: {
					eng: {
						official: "Anguilla",
						common: "Anguilla",
					},
				},
			},
			altSpellings: ["AI"],
		},
		{
			name: {
				common: "Åland Islands",
				official: "Åland Islands",
				nativeName: {
					swe: {
						official: "Landskapet Åland",
						common: "Åland",
					},
				},
			},
			altSpellings: ["AX", "Aaland", "Aland", "Ahvenanmaa"],
		},
		{
			name: {
				common: "Belgium",
				official: "Kingdom of Belgium",
				nativeName: {
					deu: {
						official: "Königreich Belgien",
						common: "Belgien",
					},
					fra: {
						official: "Royaume de Belgique",
						common: "Belgique",
					},
					nld: {
						official: "Koninkrijk België",
						common: "België",
					},
				},
			},
			altSpellings: [
				"BE",
				"België",
				"Belgie",
				"Belgien",
				"Belgique",
				"Kingdom of Belgium",
				"Koninkrijk België",
				"Royaume de Belgique",
				"Königreich Belgien",
			],
		},
		{
			name: {
				common: "Portugal",
				official: "Portuguese Republic",
				nativeName: {
					por: {
						official: "República português",
						common: "Portugal",
					},
				},
			},
			altSpellings: [
				"PT",
				"Portuguesa",
				"Portuguese Republic",
				"República Portuguesa",
			],
		},
		{
			name: {
				common: "Denmark",
				official: "Kingdom of Denmark",
				nativeName: {
					dan: {
						official: "Kongeriget Danmark",
						common: "Danmark",
					},
				},
			},
			altSpellings: [
				"DK",
				"Danmark",
				"Kingdom of Denmark",
				"Kongeriget Danmark",
			],
		},
		{
			name: {
				common: "Philippines",
				official: "Republic of the Philippines",
				nativeName: {
					eng: {
						official: "Republic of the Philippines",
						common: "Philippines",
					},
					fil: {
						official: "Republic of the Philippines",
						common: "Pilipinas",
					},
				},
			},
			altSpellings: [
				"PH",
				"Republic of the Philippines",
				"Repúblika ng Pilipinas",
			],
		},
		{
			name: {
				common: "Wallis and Futuna",
				official: "Territory of the Wallis and Futuna Islands",
				nativeName: {
					fra: {
						official: "Territoire des îles Wallis et Futuna",
						common: "Wallis et Futuna",
					},
				},
			},
			altSpellings: [
				"WF",
				"Territory of the Wallis and Futuna Islands",
				"Territoire des îles Wallis et Futuna",
			],
		},
		{
			name: {
				common: "Austria",
				official: "Republic of Austria",
				nativeName: {
					bar: {
						official: "Republik Österreich",
						common: "Österreich",
					},
				},
			},
			altSpellings: ["AT", "Osterreich", "Oesterreich"],
		},
		{
			name: {
				common: "Guinea-Bissau",
				official: "Republic of Guinea-Bissau",
				nativeName: {
					por: {
						official: "República da Guiné-Bissau",
						common: "Guiné-Bissau",
					},
					pov: {
						official: "República da Guiné-Bissau",
						common: "Guiné-Bissau",
					},
				},
			},
			altSpellings: [
				"GW",
				"Republic of Guinea-Bissau",
				"República da Guiné-Bissau",
			],
		},
		{
			name: {
				common: "Monaco",
				official: "Principality of Monaco",
				nativeName: {
					fra: {
						official: "Principauté de Monaco",
						common: "Monaco",
					},
				},
			},
			altSpellings: [
				"MC",
				"Principality of Monaco",
				"Principauté de Monaco",
			],
		},
		{
			name: {
				common: "Namibia",
				official: "Republic of Namibia",
				nativeName: {
					afr: {
						official: "Republiek van Namibië",
						common: "Namibië",
					},
					deu: {
						official: "Republik Namibia",
						common: "Namibia",
					},
					eng: {
						official: "Republic of Namibia",
						common: "Namibia",
					},
					her: {
						official: "Republic of Namibia",
						common: "Namibia",
					},
					hgm: {
						official: "Republic of Namibia",
						common: "Namibia",
					},
					kwn: {
						official: "Republic of Namibia",
						common: "Namibia",
					},
					loz: {
						official: "Republic of Namibia",
						common: "Namibia",
					},
					ndo: {
						official: "Republic of Namibia",
						common: "Namibia",
					},
					tsn: {
						official: "Lefatshe la Namibia",
						common: "Namibia",
					},
				},
			},
			altSpellings: ["NA", "Namibië", "Republic of Namibia"],
		},
		{
			name: {
				common: "United States Minor Outlying Islands",
				official: "United States Minor Outlying Islands",
				nativeName: {
					eng: {
						official: "United States Minor Outlying Islands",
						common: "United States Minor Outlying Islands",
					},
				},
			},
			altSpellings: ["UM"],
		},
		{
			name: {
				common: "Costa Rica",
				official: "Republic of Costa Rica",
				nativeName: {
					spa: {
						official: "República de Costa Rica",
						common: "Costa Rica",
					},
				},
			},
			altSpellings: [
				"CR",
				"Republic of Costa Rica",
				"República de Costa Rica",
			],
		},
		{
			name: {
				common: "Bosnia and Herzegovina",
				official: "Bosnia and Herzegovina",
				nativeName: {
					bos: {
						official: "Bosna i Hercegovina",
						common: "Bosna i Hercegovina",
					},
					hrv: {
						official: "Bosna i Hercegovina",
						common: "Bosna i Hercegovina",
					},
					srp: {
						official: "Босна и Херцеговина",
						common: "Босна и Херцеговина",
					},
				},
			},
			altSpellings: ["BA", "Bosnia-Herzegovina", "Босна и Херцеговина"],
		},
		{
			name: {
				common: "Macau",
				official:
					"Macao Special Administrative Region of the People's Republic of China",
				nativeName: {
					por: {
						official:
							"Região Administrativa Especial de Macau da República Popular da China",
						common: "Macau",
					},
					zho: {
						official: "中华人民共和国澳门特别行政区",
						common: "澳门",
					},
				},
			},
			altSpellings: [
				"MO",
				"澳门",
				"Macao",
				"Macao Special Administrative Region of the People's Republic of China",
				"中華人民共和國澳門特別行政區",
				"Região Administrativa Especial de Macau da República Popular da China",
			],
		},
		{
			name: {
				common: "Mozambique",
				official: "Republic of Mozambique",
				nativeName: {
					por: {
						official: "República de Moçambique",
						common: "Moçambique",
					},
				},
			},
			altSpellings: [
				"MZ",
				"Republic of Mozambique",
				"República de Moçambique",
			],
		},
		{
			name: {
				common: "Réunion",
				official: "Réunion Island",
				nativeName: {
					fra: {
						official: "Ile de la Réunion",
						common: "La Réunion",
					},
				},
			},
			altSpellings: ["RE", "Reunion"],
		},
		{
			name: {
				common: "Montenegro",
				official: "Montenegro",
				nativeName: {
					cnr: {
						official: "Црна Гора",
						common: "Црна Гора",
					},
				},
			},
			altSpellings: ["ME", "Crna Gora"],
		},
		{
			name: {
				common: "North Korea",
				official: "Democratic People's Republic of Korea",
				nativeName: {
					kor: {
						official: "조선민주주의인민공화국",
						common: "조선",
					},
				},
			},
			altSpellings: [
				"KP",
				"Democratic People's Republic of Korea",
				"DPRK",
				"조선민주주의인민공화국",
				"Chosŏn Minjujuŭi Inmin Konghwaguk",
				"Korea, Democratic People's Republic of",
				"북한",
				"북조선",
			],
		},
		{
			name: {
				common: "Northern Mariana Islands",
				official: "Commonwealth of the Northern Mariana Islands",
				nativeName: {
					cal: {
						official:
							"Commonwealth of the Northern Mariana Islands",
						common: "Northern Mariana Islands",
					},
					cha: {
						official: "Sankattan Siha Na Islas Mariånas",
						common: "Na Islas Mariånas",
					},
					eng: {
						official:
							"Commonwealth of the Northern Mariana Islands",
						common: "Northern Mariana Islands",
					},
				},
			},
			altSpellings: [
				"MP",
				"Commonwealth of the Northern Mariana Islands",
				"Sankattan Siha Na Islas Mariånas",
			],
		},
		{
			name: {
				common: "Ukraine",
				official: "Ukraine",
				nativeName: {
					ukr: {
						official: "Україна",
						common: "Україна",
					},
				},
			},
			altSpellings: ["UA", "Ukrayina"],
		},
		{
			name: {
				common: "Iraq",
				official: "Republic of Iraq",
				nativeName: {
					ara: {
						official: "جمهورية العراق",
						common: "العراق",
					},
					arc: {
						official: "ܩܘܼܛܢܵܐ ܐܝܼܪܲܩ",
						common: "ܩܘܼܛܢܵܐ",
					},
					ckb: {
						official: "کۆماری عێراق",
						common: "کۆماری",
					},
				},
			},
			altSpellings: ["IQ", "Republic of Iraq", "Jumhūriyyat al-‘Irāq"],
		},
		{
			name: {
				common: "South Georgia",
				official: "South Georgia and the South Sandwich Islands",
				nativeName: {
					eng: {
						official:
							"South Georgia and the South Sandwich Islands",
						common: "South Georgia",
					},
				},
			},
			altSpellings: [
				"GS",
				"South Georgia and the South Sandwich Islands",
			],
		},
		{
			name: {
				common: "Angola",
				official: "Republic of Angola",
				nativeName: {
					por: {
						official: "República de Angola",
						common: "Angola",
					},
				},
			},
			altSpellings: ["AO", "República de Angola", "ʁɛpublika de an'ɡɔla"],
		},
		{
			name: {
				common: "Sierra Leone",
				official: "Republic of Sierra Leone",
				nativeName: {
					eng: {
						official: "Republic of Sierra Leone",
						common: "Sierra Leone",
					},
				},
			},
			altSpellings: ["SL", "Republic of Sierra Leone"],
		},
		{
			name: {
				common: "Micronesia",
				official: "Federated States of Micronesia",
				nativeName: {
					eng: {
						official: "Federated States of Micronesia",
						common: "Micronesia",
					},
				},
			},
			altSpellings: [
				"FM",
				"Federated States of Micronesia",
				"Micronesia, Federated States of",
			],
		},
		{
			name: {
				common: "Cuba",
				official: "Republic of Cuba",
				nativeName: {
					spa: {
						official: "República de Cuba",
						common: "Cuba",
					},
				},
			},
			altSpellings: ["CU", "Republic of Cuba", "República de Cuba"],
		},
		{
			name: {
				common: "Turks and Caicos Islands",
				official: "Turks and Caicos Islands",
				nativeName: {
					eng: {
						official: "Turks and Caicos Islands",
						common: "Turks and Caicos Islands",
					},
				},
			},
			altSpellings: ["TC"],
		},
		{
			name: {
				common: "Serbia",
				official: "Republic of Serbia",
				nativeName: {
					srp: {
						official: "Република Србија",
						common: "Србија",
					},
				},
			},
			altSpellings: [
				"RS",
				"Srbija",
				"Republic of Serbia",
				"Република Србија",
				"Republika Srbija",
			],
		},
		{
			name: {
				common: "Ecuador",
				official: "Republic of Ecuador",
				nativeName: {
					spa: {
						official: "República del Ecuador",
						common: "Ecuador",
					},
				},
			},
			altSpellings: [
				"EC",
				"Republic of Ecuador",
				"República del Ecuador",
			],
		},
		{
			name: {
				common: "Faroe Islands",
				official: "Faroe Islands",
				nativeName: {
					dan: {
						official: "Færøerne",
						common: "Færøerne",
					},
					fao: {
						official: "Føroyar",
						common: "Føroyar",
					},
				},
			},
			altSpellings: ["FO", "Føroyar", "Færøerne"],
		},
		{
			name: {
				common: "Antarctica",
				official: "Antarctica",
				nativeName: {},
			},
			altSpellings: ["AQ"],
		},
		{
			name: {
				common: "Palestine",
				official: "State of Palestine",
				nativeName: {
					ara: {
						official: "دولة فلسطين",
						common: "فلسطين",
					},
				},
			},
			altSpellings: [
				"PS",
				"Palestine, State of",
				"State of Palestine",
				"Dawlat Filasṭin",
			],
		},
		{
			name: {
				common: "Turkey",
				official: "Republic of Turkey",
				nativeName: {
					tur: {
						official: "Türkiye Cumhuriyeti",
						common: "Türkiye",
					},
				},
			},
			altSpellings: [
				"TR",
				"Turkiye",
				"Republic of Turkey",
				"Türkiye Cumhuriyeti",
			],
		},
		{
			name: {
				common: "Kiribati",
				official: "Independent and Sovereign Republic of Kiribati",
				nativeName: {
					eng: {
						official:
							"Independent and Sovereign Republic of Kiribati",
						common: "Kiribati",
					},
					gil: {
						official: "Ribaberiki Kiribati",
						common: "Kiribati",
					},
				},
			},
			altSpellings: ["KI", "Republic of Kiribati", "Ribaberiki Kiribati"],
		},
		{
			name: {
				common: "Kazakhstan",
				official: "Republic of Kazakhstan",
				nativeName: {
					kaz: {
						official: "Қазақстан Республикасы",
						common: "Қазақстан",
					},
					rus: {
						official: "Республика Казахстан",
						common: "Казахстан",
					},
				},
			},
			altSpellings: [
				"KZ",
				"Qazaqstan",
				"Казахстан",
				"Republic of Kazakhstan",
				"Қазақстан Республикасы",
				"Qazaqstan Respublïkası",
				"Республика Казахстан",
				"Respublika Kazakhstan",
			],
		},
		{
			name: {
				common: "Gibraltar",
				official: "Gibraltar",
				nativeName: {
					eng: {
						official: "Gibraltar",
						common: "Gibraltar",
					},
				},
			},
			altSpellings: ["GI"],
		},
		{
			name: {
				common: "Iceland",
				official: "Iceland",
				nativeName: {
					isl: {
						official: "Ísland",
						common: "Ísland",
					},
				},
			},
			altSpellings: [
				"IS",
				"Island",
				"Republic of Iceland",
				"Lýðveldið Ísland",
			],
		},
		{
			name: {
				common: "Palau",
				official: "Republic of Palau",
				nativeName: {
					eng: {
						official: "Republic of Palau",
						common: "Palau",
					},
					pau: {
						official: "Beluu er a Belau",
						common: "Belau",
					},
				},
			},
			altSpellings: ["PW", "Republic of Palau", "Beluu er a Belau"],
		},
		{
			name: {
				common: "Qatar",
				official: "State of Qatar",
				nativeName: {
					ara: {
						official: "دولة قطر",
						common: "قطر",
					},
				},
			},
			altSpellings: ["QA", "State of Qatar", "Dawlat Qaṭar"],
		},
		{
			name: {
				common: "Switzerland",
				official: "Swiss Confederation",
				nativeName: {
					fra: {
						official: "Confédération suisse",
						common: "Suisse",
					},
					gsw: {
						official: "Schweizerische Eidgenossenschaft",
						common: "Schweiz",
					},
					ita: {
						official: "Confederazione Svizzera",
						common: "Svizzera",
					},
					roh: {
						official: "Confederaziun svizra",
						common: "Svizra",
					},
				},
			},
			altSpellings: [
				"CH",
				"Swiss Confederation",
				"Schweiz",
				"Suisse",
				"Svizzera",
				"Svizra",
			],
		},
		{
			name: {
				common: "French Polynesia",
				official: "French Polynesia",
				nativeName: {
					fra: {
						official: "Polynésie française",
						common: "Polynésie française",
					},
				},
			},
			altSpellings: [
				"PF",
				"Polynésie française",
				"French Polynesia",
				"Pōrīnetia Farāni",
			],
		},
		{
			name: {
				common: "Pitcairn Islands",
				official: "Pitcairn Group of Islands",
				nativeName: {
					eng: {
						official: "Pitcairn Group of Islands",
						common: "Pitcairn Islands",
					},
				},
			},
			altSpellings: [
				"PN",
				"Pitcairn",
				"Pitcairn Henderson Ducie and Oeno Islands",
			],
		},
		{
			name: {
				common: "Jordan",
				official: "Hashemite Kingdom of Jordan",
				nativeName: {
					ara: {
						official: "المملكة الأردنية الهاشمية",
						common: "الأردن",
					},
				},
			},
			altSpellings: [
				"JO",
				"Hashemite Kingdom of Jordan",
				"al-Mamlakah al-Urdunīyah al-Hāshimīyah",
			],
		},
		{
			name: {
				common: "Myanmar",
				official: "Republic of the Union of Myanmar",
				nativeName: {
					mya: {
						official: "ပြည်ထောင်စု သမ္မတ မြန်မာနိုင်ငံတော်",
						common: "မြန်မာ",
					},
				},
			},
			altSpellings: [
				"MM",
				"Burma",
				"Republic of the Union of Myanmar",
				"Pyidaunzu Thanmăda Myăma Nainngandaw",
			],
		},
		{
			name: {
				common: "Thailand",
				official: "Kingdom of Thailand",
				nativeName: {
					tha: {
						official: "ราชอาณาจักรไทย",
						common: "ประเทศไทย",
					},
				},
			},
			altSpellings: [
				"TH",
				"Prathet",
				"Thai",
				"Kingdom of Thailand",
				"ราชอาณาจักรไทย",
				"Ratcha Anachak Thai",
			],
		},
		{
			name: {
				common: "Caribbean Netherlands",
				official: "Bonaire, Sint Eustatius and Saba",
				nativeName: {
					nld: {
						official: "Bonaire, Sint Eustatius en Saba",
						common: "Caribisch Nederland",
					},
					pap: {
						official: "Boneiru, Sint Eustatius y Saba",
						common: "Boneiru, Sint Eustatius y Saba",
					},
				},
			},
			altSpellings: ["BES islands"],
		},
		{
			name: {
				common: "Aruba",
				official: "Aruba",
				nativeName: {
					nld: {
						official: "Aruba",
						common: "Aruba",
					},
					pap: {
						official: "Aruba",
						common: "Aruba",
					},
				},
			},
			altSpellings: ["AW"],
		},
		{
			name: {
				common: "Guadeloupe",
				official: "Guadeloupe",
				nativeName: {
					fra: {
						official: "Guadeloupe",
						common: "Guadeloupe",
					},
				},
			},
			altSpellings: ["GP", "Gwadloup"],
		},
		{
			name: {
				common: "Nigeria",
				official: "Federal Republic of Nigeria",
				nativeName: {
					eng: {
						official: "Federal Republic of Nigeria",
						common: "Nigeria",
					},
				},
			},
			altSpellings: [
				"NG",
				"Nijeriya",
				"Naíjíríà",
				"Federal Republic of Nigeria",
			],
		},
		{
			name: {
				common: "Bahrain",
				official: "Kingdom of Bahrain",
				nativeName: {
					ara: {
						official: "مملكة البحرين",
						common: "‏البحرين",
					},
				},
			},
			altSpellings: ["BH", "Kingdom of Bahrain", "Mamlakat al-Baḥrayn"],
		},
		{
			name: {
				common: "Laos",
				official: "Lao People's Democratic Republic",
				nativeName: {
					lao: {
						official: "ສາທາລະນະ ຊາທິປະໄຕ ຄົນລາວ ຂອງ",
						common: "ສປປລາວ",
					},
				},
			},
			altSpellings: [
				"LA",
				"Lao",
				"Lao People's Democratic Republic",
				"Sathalanalat Paxathipatai Paxaxon Lao",
			],
		},
		{
			name: {
				common: "Cocos (Keeling) Islands",
				official: "Territory of the Cocos (Keeling) Islands",
				nativeName: {
					eng: {
						official: "Territory of the Cocos (Keeling) Islands",
						common: "Cocos (Keeling) Islands",
					},
				},
			},
			altSpellings: ["CC", "Keeling Islands", "Cocos Islands"],
		},
		{
			name: {
				common: "Djibouti",
				official: "Republic of Djibouti",
				nativeName: {
					ara: {
						official: "جمهورية جيبوتي",
						common: "جيبوتي‎",
					},
					fra: {
						official: "République de Djibouti",
						common: "Djibouti",
					},
				},
			},
			altSpellings: [
				"DJ",
				"Jabuuti",
				"Gabuuti",
				"Republic of Djibouti",
				"République de Djibouti",
				"Gabuutih Ummuuno",
				"Jamhuuriyadda Jabuuti",
			],
		},
		{
			name: {
				common: "Solomon Islands",
				official: "Solomon Islands",
				nativeName: {
					eng: {
						official: "Solomon Islands",
						common: "Solomon Islands",
					},
				},
			},
			altSpellings: ["SB"],
		},
		{
			name: {
				common: "Heard Island and McDonald Islands",
				official: "Heard Island and McDonald Islands",
				nativeName: {
					eng: {
						official: "Heard Island and McDonald Islands",
						common: "Heard Island and McDonald Islands",
					},
				},
			},
			altSpellings: ["HM", "Heard Island and McDonald Islands"],
		},
		{
			name: {
				common: "India",
				official: "Republic of India",
				nativeName: {
					eng: {
						official: "Republic of India",
						common: "India",
					},
					hin: {
						official: "भारत गणराज्य",
						common: "भारत",
					},
					tam: {
						official: "இந்தியக் குடியரசு",
						common: "இந்தியா",
					},
				},
			},
			altSpellings: [
				"IN",
				"Bhārat",
				"Republic of India",
				"Bharat Ganrajya",
				"இந்தியா",
			],
		},
		{
			name: {
				common: "San Marino",
				official: "Republic of San Marino",
				nativeName: {
					ita: {
						official: "Repubblica di San Marino",
						common: "San Marino",
					},
				},
			},
			altSpellings: [
				"SM",
				"Republic of San Marino",
				"Repubblica di San Marino",
			],
		},
		{
			name: {
				common: "Luxembourg",
				official: "Grand Duchy of Luxembourg",
				nativeName: {
					deu: {
						official: "Großherzogtum Luxemburg",
						common: "Luxemburg",
					},
					fra: {
						official: "Grand-Duché de Luxembourg",
						common: "Luxembourg",
					},
					ltz: {
						official: "Groussherzogtum Lëtzebuerg",
						common: "Lëtzebuerg",
					},
				},
			},
			altSpellings: [
				"LU",
				"Grand Duchy of Luxembourg",
				"Grand-Duché de Luxembourg",
				"Großherzogtum Luxemburg",
				"Groussherzogtum Lëtzebuerg",
			],
		},
		{
			name: {
				common: "Sint Maarten",
				official: "Sint Maarten",
				nativeName: {
					eng: {
						official: "Sint Maarten",
						common: "Sint Maarten",
					},
					fra: {
						official: "Saint-Martin",
						common: "Saint-Martin",
					},
					nld: {
						official: "Sint Maarten",
						common: "Sint Maarten",
					},
				},
			},
			altSpellings: ["SX", "Sint Maarten (Dutch part)"],
		},
		{
			name: {
				common: "Falkland Islands",
				official: "Falkland Islands",
				nativeName: {
					eng: {
						official: "Falkland Islands",
						common: "Falkland Islands",
					},
				},
			},
			altSpellings: [
				"FK",
				"Islas Malvinas",
				"Falkland Islands (Malvinas)",
			],
		},
		{
			name: {
				common: "Central African Republic",
				official: "Central African Republic",
				nativeName: {
					fra: {
						official: "République centrafricaine",
						common: "République centrafricaine",
					},
					sag: {
						official: "Ködörösêse tî Bêafrîka",
						common: "Bêafrîka",
					},
				},
			},
			altSpellings: [
				"CF",
				"Central African Republic",
				"République centrafricaine",
			],
		},
		{
			name: {
				common: "Botswana",
				official: "Republic of Botswana",
				nativeName: {
					eng: {
						official: "Republic of Botswana",
						common: "Botswana",
					},
					tsn: {
						official: "Lefatshe la Botswana",
						common: "Botswana",
					},
				},
			},
			altSpellings: [
				"BW",
				"Republic of Botswana",
				"Lefatshe la Botswana",
			],
		},
		{
			name: {
				common: "Curaçao",
				official: "Country of Curaçao",
				nativeName: {
					eng: {
						official: "Country of Curaçao",
						common: "Curaçao",
					},
					nld: {
						official: "Land Curaçao",
						common: "Curaçao",
					},
					pap: {
						official: "Pais Kòrsou",
						common: "Pais Kòrsou",
					},
				},
			},
			altSpellings: [
				"CW",
				"Curacao",
				"Kòrsou",
				"Country of Curaçao",
				"Land Curaçao",
				"Pais Kòrsou",
			],
		},
		{
			name: {
				common: "Guernsey",
				official: "Bailiwick of Guernsey",
				nativeName: {
					eng: {
						official: "Bailiwick of Guernsey",
						common: "Guernsey",
					},
					fra: {
						official: "Bailliage de Guernesey",
						common: "Guernesey",
					},
					nfr: {
						official: "Dgèrnésiais",
						common: "Dgèrnésiais",
					},
				},
			},
			altSpellings: [
				"GG",
				"Bailiwick of Guernsey",
				"Bailliage de Guernesey",
			],
		},
		{
			name: {
				common: "Norway",
				official: "Kingdom of Norway",
				nativeName: {
					nno: {
						official: "Kongeriket Noreg",
						common: "Noreg",
					},
					nob: {
						official: "Kongeriket Norge",
						common: "Norge",
					},
					smi: {
						official: "Norgga gonagasriika",
						common: "Norgga",
					},
				},
			},
			altSpellings: [
				"NO",
				"Norge",
				"Noreg",
				"Kingdom of Norway",
				"Kongeriket Norge",
				"Kongeriket Noreg",
			],
		},
		{
			name: {
				common: "Gabon",
				official: "Gabonese Republic",
				nativeName: {
					fra: {
						official: "République gabonaise",
						common: "Gabon",
					},
				},
			},
			altSpellings: ["GA", "Gabonese Republic", "République Gabonaise"],
		},
		{
			name: {
				common: "Zimbabwe",
				official: "Republic of Zimbabwe",
				nativeName: {
					bwg: {
						official: "Republic of Zimbabwe",
						common: "Zimbabwe",
					},
					eng: {
						official: "Republic of Zimbabwe",
						common: "Zimbabwe",
					},
					kck: {
						official: "Republic of Zimbabwe",
						common: "Zimbabwe",
					},
					khi: {
						official: "Republic of Zimbabwe",
						common: "Zimbabwe",
					},
					ndc: {
						official: "Republic of Zimbabwe",
						common: "Zimbabwe",
					},
					nde: {
						official: "Republic of Zimbabwe",
						common: "Zimbabwe",
					},
					nya: {
						official: "Republic of Zimbabwe",
						common: "Zimbabwe",
					},
					sna: {
						official: "Republic of Zimbabwe",
						common: "Zimbabwe",
					},
					sot: {
						official: "Republic of Zimbabwe",
						common: "Zimbabwe",
					},
					toi: {
						official: "Republic of Zimbabwe",
						common: "Zimbabwe",
					},
					tsn: {
						official: "Republic of Zimbabwe",
						common: "Zimbabwe",
					},
					tso: {
						official: "Republic of Zimbabwe",
						common: "Zimbabwe",
					},
					ven: {
						official: "Republic of Zimbabwe",
						common: "Zimbabwe",
					},
					xho: {
						official: "Republic of Zimbabwe",
						common: "Zimbabwe",
					},
					zib: {
						official: "Republic of Zimbabwe",
						common: "Zimbabwe",
					},
				},
			},
			altSpellings: ["ZW", "Republic of Zimbabwe"],
		},
		{
			name: {
				common: "Lesotho",
				official: "Kingdom of Lesotho",
				nativeName: {
					eng: {
						official: "Kingdom of Lesotho",
						common: "Lesotho",
					},
					sot: {
						official: "Kingdom of Lesotho",
						common: "Lesotho",
					},
				},
			},
			altSpellings: ["LS", "Kingdom of Lesotho", "Muso oa Lesotho"],
		},
		{
			name: {
				common: "Slovenia",
				official: "Republic of Slovenia",
				nativeName: {
					slv: {
						official: "Republika Slovenija",
						common: "Slovenija",
					},
				},
			},
			altSpellings: ["SI", "Republic of Slovenia", "Republika Slovenija"],
		},
		{
			name: {
				common: "Argentina",
				official: "Argentine Republic",
				nativeName: {
					grn: {
						official: "Argentine Republic",
						common: "Argentina",
					},
					spa: {
						official: "República Argentina",
						common: "Argentina",
					},
				},
			},
			altSpellings: ["AR", "Argentine Republic", "República Argentina"],
		},
		{
			name: {
				common: "Burkina Faso",
				official: "Burkina Faso",
				nativeName: {
					fra: {
						official: "République du Burkina",
						common: "Burkina Faso",
					},
				},
			},
			altSpellings: ["BF"],
		},
		{
			name: {
				common: "Yemen",
				official: "Republic of Yemen",
				nativeName: {
					ara: {
						official: "الجمهورية اليمنية",
						common: "اليَمَن",
					},
				},
			},
			altSpellings: [
				"YE",
				"Yemeni Republic",
				"al-Jumhūriyyah al-Yamaniyyah",
			],
		},
		{
			name: {
				common: "DR Congo",
				official: "Democratic Republic of the Congo",
				nativeName: {
					fra: {
						official: "République démocratique du Congo",
						common: "RD Congo",
					},
					kon: {
						official: "Repubilika ya Kongo Demokratiki",
						common: "Repubilika ya Kongo Demokratiki",
					},
					lin: {
						official: "Republiki ya Kongó Demokratiki",
						common: "Republiki ya Kongó Demokratiki",
					},
					lua: {
						official: "Ditunga dia Kongu wa Mungalaata",
						common: "Ditunga dia Kongu wa Mungalaata",
					},
					swa: {
						official: "Jamhuri ya Kidemokrasia ya Kongo",
						common: "Jamhuri ya Kidemokrasia ya Kongo",
					},
				},
			},
			altSpellings: [
				"CD",
				"DR Congo",
				"Congo-Kinshasa",
				"Congo, the Democratic Republic of the",
				"DRC",
			],
		},
		{
			name: {
				common: "Oman",
				official: "Sultanate of Oman",
				nativeName: {
					ara: {
						official: "سلطنة عمان",
						common: "عمان",
					},
				},
			},
			altSpellings: ["OM", "Sultanate of Oman", "Salṭanat ʻUmān"],
		},
		{
			name: {
				common: "Indonesia",
				official: "Republic of Indonesia",
				nativeName: {
					ind: {
						official: "Republik Indonesia",
						common: "Indonesia",
					},
				},
			},
			altSpellings: ["ID", "Republic of Indonesia", "Republik Indonesia"],
		},
		{
			name: {
				common: "Nauru",
				official: "Republic of Nauru",
				nativeName: {
					eng: {
						official: "Republic of Nauru",
						common: "Nauru",
					},
					nau: {
						official: "Republic of Nauru",
						common: "Nauru",
					},
				},
			},
			altSpellings: [
				"NR",
				"Naoero",
				"Pleasant Island",
				"Republic of Nauru",
				"Ripublik Naoero",
			],
		},
		{
			name: {
				common: "Rwanda",
				official: "Republic of Rwanda",
				nativeName: {
					eng: {
						official: "Republic of Rwanda",
						common: "Rwanda",
					},
					fra: {
						official: "République rwandaise",
						common: "Rwanda",
					},
					kin: {
						official: "Repubulika y'u Rwanda",
						common: "Rwanda",
					},
				},
			},
			altSpellings: [
				"RW",
				"Republic of Rwanda",
				"Repubulika y'u Rwanda",
				"République du Rwanda",
			],
		},
		{
			name: {
				common: "North Macedonia",
				official: "Republic of North Macedonia",
				nativeName: {
					mkd: {
						official: "Република Северна Македонија",
						common: "Македонија",
					},
				},
			},
			altSpellings: [
				"MK",
				"The former Yugoslav Republic of Macedonia",
				"Republic of North Macedonia",
				"Macedonia, The Former Yugoslav Republic of",
				"Република Северна Македонија",
			],
		},
		{
			name: {
				common: "Kosovo",
				official: "Republic of Kosovo",
				nativeName: {
					sqi: {
						official: "Republika e Kosovës",
						common: "Kosova",
					},
					srp: {
						official: "Република Косово",
						common: "Косово",
					},
				},
			},
			altSpellings: ["XK", "Република Косово"],
		},
		{
			name: {
				common: "Netherlands",
				official: "Kingdom of the Netherlands",
				nativeName: {
					nld: {
						official: "Koninkrijk der Nederlanden",
						common: "Nederland",
					},
				},
			},
			altSpellings: ["NL", "Holland", "Nederland", "The Netherlands"],
		},
		{
			name: {
				common: "Tunisia",
				official: "Tunisian Republic",
				nativeName: {
					ara: {
						official: "الجمهورية التونسية",
						common: "تونس",
					},
				},
			},
			altSpellings: [
				"TN",
				"Republic of Tunisia",
				"al-Jumhūriyyah at-Tūnisiyyah",
			],
		},
		{
			name: {
				common: "South Sudan",
				official: "Republic of South Sudan",
				nativeName: {
					eng: {
						official: "Republic of South Sudan",
						common: "South Sudan",
					},
				},
			},
			altSpellings: ["SS"],
		},
		{
			name: {
				common: "Honduras",
				official: "Republic of Honduras",
				nativeName: {
					spa: {
						official: "República de Honduras",
						common: "Honduras",
					},
				},
			},
			altSpellings: [
				"HN",
				"Republic of Honduras",
				"República de Honduras",
			],
		},
		{
			name: {
				common: "Saint Vincent and the Grenadines",
				official: "Saint Vincent and the Grenadines",
				nativeName: {
					eng: {
						official: "Saint Vincent and the Grenadines",
						common: "Saint Vincent and the Grenadines",
					},
				},
			},
			altSpellings: ["VC"],
		},
		{
			name: {
				common: "Sri Lanka",
				official: "Democratic Socialist Republic of Sri Lanka",
				nativeName: {
					sin: {
						official: "ශ්‍රී ලංකා ප්‍රජාතාන්ත්‍රික සමාජවාදී ජනරජය",
						common: "ශ්‍රී ලංකාව",
					},
					tam: {
						official: "இலங்கை சனநாயக சோசலிசக் குடியரசு",
						common: "இலங்கை",
					},
				},
			},
			altSpellings: [
				"LK",
				"ilaṅkai",
				"Democratic Socialist Republic of Sri Lanka",
			],
		},
		{
			name: {
				common: "Hong Kong",
				official:
					"Hong Kong Special Administrative Region of the People's Republic of China",
				nativeName: {
					eng: {
						official:
							"Hong Kong Special Administrative Region of the People's Republic of China",
						common: "Hong Kong",
					},
					zho: {
						official: "中华人民共和国香港特别行政区",
						common: "香港",
					},
				},
			},
			altSpellings: ["HK"],
		},
	].sort((a, b) => a.name.common.localeCompare(b.name.common));

	const findCountryByAltSpellings = (altSpelling: string) => {
		for (let country of countries.value) {
			if (country.altSpellings.includes(altSpelling)) {
				// console.log("FOUND: ", country);
				return country;
			}
			// console.log(altSpelling + " -> searching: " + country.name.common);
		}
		return countries.value[0]; // Return null if country is not found
	};

	const setCountry = () => {
		axios
			.request({
				url: "https://api.ip2location.io",
				method: "GET",
			})
			.then((res): void => {
				// console.log("Res Data: ", res.data);
				country.value = findCountryByAltSpellings(
					res.data.country_code
				);
			})
			.catch((e) => console.log("Data: ", e));
	};

	// setCountry();

	return {
		countries,
		country,
		setCountry,
	};
};
