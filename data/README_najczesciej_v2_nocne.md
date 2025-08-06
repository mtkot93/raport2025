# Analiza Średniego Czasu Oczekiwania na Połączenie - godziny nocne (22:00-6:00)

## Opis procesu

### 1. Założenia analizy
Na podstawie wniosków z analizy charakterystyki danych (`memorybank/data_characteristics.md`), zastosowano następujące filtry:

- **Tylko dni robocze** (poniedziałek-piątek) - wykluczenie weekendów
- **Tylko godziny nocne** (22:00-6:00) - analiza połączeń w czasie nocnym
- **Podział na miasta/regiony** - osobna analiza dla każdego regionu
- **Zastosowanie metody MAD** do identyfikacji outlierów

### 2. Proces przetwarzania danych

1. **Wczytanie danych**: 304,581 rekordów z pliku `jd_report_route_10.csv`
2. **Filtrowanie dni roboczych**: 302,281 rekordów (98.7%)
3. **Filtrowanie godzin nocnych**: 42,488 rekordów (14.0% dni roboczych)
4. **Usunięcie braków danych**: 41,216 rekordów do analizy

### 3. Metodologia

#### Statystyki obliczone dla każdego regionu:
- **Średnia** - mniej reprezentatywna ze względu na skośność rozkładu
- **Mediana** - bardziej odporna na outliers, lepsza miara tendencji centralnej
- **Odchylenie standardowe** - miara rozproszenia
- **Minimum i maksimum** - zakres wartości
- **Percentyle** (P25, P75, P90, P95) - rozkład wartości
- **Liczba i procent outlierów** (metoda MAD z progiem 3.5)

#### Metoda MAD (Median Absolute Deviation):
- Odporna na skośny rozkład danych
- Threshold = 3.5 (standardowa wartość)
- Skalowanie MAD: 1.4826 * MAD (normalizacja do odchylenia standardowego)

## Kluczowe wnioski

### 1. Różnica między średnią a medianą
Wszystkie miasta wykazują bardzo znaczącą różnicę między średnią a medianą (5-27 minut), znacznie większą niż w przypadku połączeń dziennych. To wskazuje na ekstremalnie prawostronnie skośny rozkład czasów oczekiwania w godzinach nocnych.

### 2. Ranking miast (według mediany czasu oczekiwania):
1. **Kraków** - 5.0 min (najkrótszy czas)
2. **Wrocław** - 5.0 min
3. **Warszawa** - 5.0 min
4. **Poznań** - 5.0 min
5. **Trójmiasto** - 6.0 min
6. **GOP** - 6.0 min
7. **Bydgoszcz** - 6.0 min
8. **Lublin** - 6.0 min
9. **Szczecin** - 6.0 min
10. **Łódź** - 7.0 min

### 3. Miasta z największą zmiennością (różnica średnia-mediana):
- **Lublin** - największa różnica (26.86 min)
- **Szczecin** - druga największa różnica (12.58 min)
- **Poznań** - trzecia największa różnica (11.80 min)
- **Warszawa** - czwarta największa różnica (11.22 min)

### 4. Outliers - miasta z największym procentem nietypowych połączeń:
- **Białystok** - najwyższy procent outlierów (15.60%)
- **Lublin** - drugi najwyższy procent outlierów (12.50%)
- **Poznań** - trzeci najwyższy procent outlierów (10.43%)
- **Toruń** - czwarty najwyższy procent outlierów (10.71%)

### 5. Percentyl 90 (P90) - długość oczekiwania dla 90% połączeń:
- **Najmniejsze miasta**: 16-29 minut (Wrocław, Warszawa, Kraków, Bydgoszcz)
- **Lublin**: 99 minut (ekstremalnie długi czas)
- **GOP**: 29 minut
- **Poznań**: 27 minut

### 6. Porównanie z połączeniami dziennymi:
- **Znacznie mniejsza liczba połączeń**: 41,216 vs 255,785 (84% mniej)
- **Wyższa zmienność czasów**: różnice średnia-mediana 2-3x większe
- **Więcej outlierów**: średnio 8-12% vs 4-5% w dzień
- **Podobne mediany**: większość miast nadal 5-7 minut

## Charakterystyka regionów specjalnych

### Połączenia dalekobieżne (LONG_DISTANCE):
- Mediana: 15.0 min (znacznie wyższa niż w miastach)
- P90: 60 minut
- Relatywnie niski procent outlierów (5.13%)

### Miasta z ekstremalnie długimi czasami:
- **Konin**: 116.77 min średnia, 28.57% outlierów
- **Leszno**: 102.42 min średnia, 26.32% outlierów
- **Kołobrzeg**: 103.0 min średnia, 25.0% outlierów
- **Elbląg**: 121.0 min średnia (mała próba - 6 rekordów)

## Rekomendacje

1. **Używać mediany** jako głównego wskaźnika - jeszcze bardziej istotne niż w przypadku połączeń dziennych

2. **Raportować przedziały** - szczególnie P25-P75 i P90 ze względu na wysoką zmienność

3. **Analizować osobno** każde miasto - różnice są jeszcze większe niż w przypadku połączeń dziennych

4. **Szczególna uwaga na outliers** - w godzinach nocnych stanowią znacznie wyższy procent

5. **Uwzględnić specyfikę nocną**:
   - Rzadsze kursy powodują dłuższe czasy oczekiwania
   - Większa nieprzewidywalność rozkładów
   - Możliwe przerwanie kursowania w niektórych godzinach

6. **Dodatkowe metryki dla godzin nocnych**:
   - Dostępność połączeń w poszczególnych godzinach nocnych
   - Analiza według typów transportu (bus nocny vs tramwaj)
   - Porównanie piątek-sobota vs pozostałe dni robocze

## Pliki wygenerowane

- `sredni_czas_oczekiwania_v2_nocne.csv` - pełne wyniki analizy dla wszystkich 36 regionów
- `analyze_wait_times_v2_nocne.py` - skrypt przeprowadzający analizę nocną
- Analiza obejmuje **41,216 rekordów** z godzin 22:00-6:00 w dni robocze