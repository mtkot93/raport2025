# Analiza Wskaźnika "Najtaniej" - Średni Koszt Kilometra Trasy

## 🚨 KRYTYCZNE OGRANICZENIE DANYCH

**TYLKO 1.66% WSZYSTKICH REKORDÓW (5,068 z 304,581) ZAWIERA INFORMACJE O CENACH!**

### Skala problemu:
- **94.02%** rekordów nie ma danych o cenach
- Z 18,213 rekordów z danymi o cenach, **72.17%** ma cenę = 0
- Tylko **5,068 rekordów** ma rzeczywiste dane o cenach > 0
- Po filtrach (dni robocze, godziny dzienne): **4,306 rekordów**

### Konsekwencje:
- Analiza obejmuje głównie połączenia **kolejowe** (TRAIN) - 100% danych
- Tylko **4 regiony** z 33 mają wystarczające dane do analizy
- Brak danych o cenach dla: autobusów, tramwajów, metra, trolejbusów
- Wyniki **NIE SĄ** reprezentatywne dla całego transportu publicznego

## 📊 Metodologia

### Wzór obliczeniowy:
```
Średni koszt kilometra = Σ(cena biletów w PLN) / Σ(długość tras w km)
```

### Zastosowane filtry:
- **Tylko dni robocze** (poniedziałek-piątek)
- **Tylko godziny dzienne** (6:00-22:00)
- **Tylko rekordy z ceną > 0** i długością > 0
- **Minimum 10 rekordów** dla regionu (wiarygodność statystyczna)
- **Metoda MAD** do identyfikacji outlierów (threshold=3.5)

### Proces filtrowania:
1. Dane początkowe: 304,581 rekordów
2. Rekordy z ceną > 0: 5,068 (1.66%)
3. Po filtrze dni roboczych: 5,068
4. Po filtrze godzin dziennych: 4,306
5. Outliers (MAD): 234 (5.43%)

## 🏆 Ranking Regionów (tylko 4 regiony z danymi)

| Pozycja | Region | Średnia ważona PLN/km | Mediana PLN/km | Liczba tras | % outlierów |
|---------|--------|------------------------|----------------|-------------|-------------|
| 🥇 | **LONG_DISTANCE** | **0.347** | 0.424 | 79 | 11.4% |
| 🥈 | **TRÓJMIASTO** | **0.428** | 0.456 | 1,902 | 5.0% |
| 🥉 | **WARSZAWA** | **0.511** | 0.569 | 2,073 | 1.8% |
| 4️⃣ | KRAKÓW | 0.826 | 0.769 | 249 | 36.9% |

### Interpretacja:
- **LONG_DISTANCE** - najtańsze połączenia długodystansowe (0.35 PLN/km)
- **TRÓJMIASTO** - najlepszy stosunek ceny do kilometra wśród miast (0.43 PLN/km)
- **WARSZAWA** - konkurencyjne ceny pomimo wielkości miasta (0.51 PLN/km)
- **KRAKÓW** - najdroższy transport, wysoki % outlierów sugeruje zróżnicowanie cen

## 🚆 Analiza Według Typu Transportu

**UWAGA**: Dane dostępne tylko dla pociągów!

| Typ transportu | Średnia ważona PLN/km | Liczba tras | Śr. cena biletu | Śr. dystans |
|----------------|------------------------|-------------|-----------------|-------------|
| **TRAIN** | **0.488** | 4,306 | 7.45 PLN | 15.27 km |

### Brak danych dla:
- ❌ BUS (autobusy) - 0 rekordów z cenami
- ❌ TRAM (tramwaje) - 0 rekordów z cenami  
- ❌ SUBWAY (metro) - 0 rekordów z cenami
- ❌ TROLLEY_BUS (trolejbusy) - 0 rekordów z cenami
- ❌ WATER_TRAM (tramwaj wodny) - 0 rekordów z cenami

## 📈 Statystyki Ogólne

### Średni koszt kilometra:
- **Średnia ważona**: 0.488 PLN/km
- **Mediana**: 0.524 PLN/km
- **Średnia arytmetyczna**: 0.626 PLN/km

### Charakterystyka biletów:
- **Średnia cena biletu**: 7.45 PLN
- **Średni dystans**: 15.27 km

### Rozkład percentylowy (PLN/km):
- P1: 0.175 (bardzo tanie)
- P10: 0.279
- P25: 0.402
- **P50 (mediana): 0.524**
- P75: 0.721
- P90: 1.035
- P99: 2.079 (bardzo drogie)

## 🔍 Analiza Brakujących Danych

### Po regionach (TOP 10):
| Region | Rekordy | Brak ceny | Ma ceny |
|--------|---------|-----------|---------|
| WARSZAWA | 71,033 | 95.5% | 4.5% |
| KRAKÓW | 48,492 | 98.5% | 1.5% |
| WROCŁAW | 45,710 | 95.6% | 4.4% |
| POZNAŃ | 34,953 | 97.4% | 2.6% |
| TRÓJMIASTO | 24,371 | 88.3% | 11.7% |
| GOP | 16,228 | 98.9% | 1.1% |
| LUBLIN | 9,510 | 99.9% | 0.1% |
| SZCZECIN | 6,429 | 100.0% | 0.0% |

### Po typach transportu:
| Typ | Rekordy | Brak ceny | Ma ceny |
|-----|---------|-----------|---------|
| BUS | 154,586 | 94.8% | 5.2% |
| TRAM | 78,019 | 99.9% | 0.1% |
| TRAIN | 13,251 | 28.6% | **71.4%** |
| TROLLEY_BUS | 4,336 | 100.0% | 0.0% |
| SUBWAY | 1,829 | 100.0% | 0.0% |

## 💡 Kluczowe Wnioski

### ✅ Co wiemy:
1. **Kolej (TRAIN)** jest jedynym środkiem transportu z dostępnymi danymi cenowymi
2. **Koszt około 0.50 PLN/km** dla transportu kolejowego
3. **Trójmiasto** oferuje najlepszy stosunek ceny do kilometra wśród miast
4. **Połączenia długodystansowe** są najtańsze per kilometr

### ⚠️ Czego NIE wiemy:
1. **Koszty transportu miejskiego** (autobusy, tramwaje, metro)
2. **Porównanie cenowe** między różnymi środkami transportu
3. **Rzeczywiste koszty** w 29 z 33 regionów
4. **Zintegrowane bilety** i taryfy miejskie

### 🔴 Ograniczenia analizy:
1. **Ekstremalnie mała próbka** - tylko 1.66% danych
2. **Dominacja jednego typu transportu** - tylko pociągi
3. **Brak danych miejskich** - kluczowych dla mobilności
4. **Niereprezentywność** - wyniki nie odzwierciedlają całości

## 🎯 Rekomendacje

### Dla systemów transportowych:
1. **Pilna potrzeba** udostępniania danych o cenach biletów
2. **Standaryzacja** systemów biletowych i raportowania
3. **Transparentność cenowa** - kluczowa dla użytkowników

### Dla analityków:
1. **Ostrożność w interpretacji** - dane bardzo ograniczone
2. **Fokus na kolei** - jedyne wiarygodne dane
3. **Potrzeba alternatywnych źródeł** danych o cenach

### Dla użytkowników:
1. **Koszt kolei** około 0.50 PLN/km to dobry benchmark
2. **Trójmiasto i Warszawa** - konkurencyjne cenowo
3. **Brak porównania** z transportem miejskim

## 📁 Pliki wygenerowane

- `analyze_missing_data.py` - analiza brakujących danych
- `analyze_cost_per_km.py` - główna analiza wskaźnika
- `sredni_koszt_kilometra_regiony.csv` - wyniki po regionach
- `sredni_koszt_kilometra_transport.csv` - wyniki po typach
- `wszystkie_regiony_koszt.csv` - wszystkie regiony (także < 10 rekordów)
- `README.md` - niniejsza dokumentacja

## 🚀 Przyszłe kierunki

1. **Pozyskanie danych** o cenach transportu miejskiego
2. **Analiza taryf strefowych** i biletów okresowych
3. **Porównanie z innymi krajami** UE
4. **Badanie dostępności cenowej** transportu

---

**Data analizy**: Styczeń 2025  
**Metodyka**: Średnia ważona = Σ(ceny) / Σ(kilometry)  
**Okres danych**: Dni robocze, godziny 6:00-22:00  
**Liczba rekordów**: 4,306 (1.4% wszystkich danych) 