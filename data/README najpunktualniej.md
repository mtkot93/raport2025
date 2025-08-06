# Analiza Punktualności Transportu Publicznego - Wskaźnik "Najpunktualnej"

## Opis wskaźnika

Wskaźnik "najpunktualniej" przedstawia **średnią bezwzględną różnicę między czasem rzeczywistym a rozkładowym** dla transportu publicznego, obliczoną jako:

**Średnia punktualność = (|opóźnienie_start| + |opóźnienie_koniec|) / 2**

Wskaźnik mierzy rzeczywistą punktualność systemu transportu publicznego w porównaniu z oficjalnymi rozkładami jazdy.

## Definicja punktualności

- **0.0 min** = transport zgodny z rozkładem (idealna punktualność)
- **Wartości > 0** = średnie opóźnienie względem rozkładu
- **Niższe wartości = lepsza punktualność**

## Metodyka analizy

### 1. Źródło danych
- **Plik**: `jd_report_route_10.csv` (304,581 rekordów)
- **Kluczowe kolumny**:
  - `start_stop_abs_delay_minutes` - bezwzględne opóźnienie na przystanku startowym
  - `target_stop_abs_delay_minutes` - bezwzględne opóźnienie na przystanku docelowym
  - `start_stop_departure_time` - czas odjazdu
  - `region_symbol` - oznaczenie regionu/miasta
  - `transport_type` - typ środka transportu

### 2. Proces filtrowania danych

1. **Kompletność danych punktualności**: 190,301 rekordów (62.5% z oryginalnych danych)
2. **Filtrowanie dni roboczych** (pon-pt): 188,742 rekordów
3. **Filtrowanie godzin dziennych** (6:00-22:00): 162,579 rekordów
4. **Dane do analizy**: 162,579 rekordów z kompletną informacją o punktualności

### 3. Zastosowane filtry

- **Tylko dni robocze** (poniedziałek-piątek) - zgodnie z metodologią innych wskaźników
- **Tylko godziny dzienne** (6:00-22:00) - wykluczenie połączeń nocnych
- **Kompletne dane punktualności** - tylko rekordy z danymi o opóźnieniach
- **Zastosowanie metody MAD** do identyfikacji outlierów (threshold=3.5)

### 4. Wzór obliczeniowy

```
punktualność_połączenia = (start_stop_abs_delay_minutes + target_stop_abs_delay_minutes) / 2
```

## Wyniki analizy

### Statystyki ogólne (162,579 rekordów)
- **Średnia bezwzględna różnica**: 1.10 min
- **Mediana**: 0.00 min (większość połączeń punktualna)
- **Odchylenie standardowe**: 6.31 min
- **Minimum**: 0.00 min
- **Maksimum**: 487.00 min (8+ godzin opóźnienia!)
- **Outliers (MAD)**: 45,642 rekordów (28.07%)

### TOP 10 najpunktualniejszych miast (według mediany):
1. **Szczecin** - 0.00 min (5,414 rekordów, średnia 0.45 min)
2. **Rybnik** - 0.00 min (15 rekordów)
3. **Grudziądz** - 0.00 min (17 rekordów)
4. **Kołobrzeg** - 0.00 min (16 rekordów)
5. **Leszno** - 0.00 min (30 rekordów)
6. **Radom** - 0.00 min (124 rekordów)
7. **Gniezno** - 0.00 min (16 rekordów)
8. **Kielce** - 0.00 min (146 rekordów)
9. **Słupsk** - 0.00 min (92 rekordów)
10. **Nowy Sącz** - 0.00 min (84 rekordów)

### Miasta z większymi problemami punktualności:
- **Warszawa** - 59,308 rekordów, średnia 1.76 min, P90: 3.5 min
- **Kraków** - 38,234 rekordów, średnia 0.74 min, P90: 2.0 min
- **Wrocław** - 37,519 rekordów, średnia 0.77 min, P90: 1.5 min
- **Trójmiasto** - 13,761 rekordów, średnia 1.06 min, P90: 2.0 min

### Punktualność według typów transportu:
1. **Pociągi (TRAIN)** - 0.00 min median, 0.07 min średnia (7,800 rekordów)
2. **Metro (SUBWAY)** - 0.00 min median, 0.00 min średnia (1,556 rekordów)
3. **Trolejbusy (TROLLEY_BUS)** - 0.00 min median, 0.00 min średnia (324 rekordów)
4. **Tramwaje (TRAM)** - 0.00 min median, 0.66 min średnia (45,815 rekordów)
5. **Autobusy (BUS)** - 0.00 min median, 1.64 min średnia (75,565 rekordów)

## Kluczowe wnioski

### 1. Ogólna punktualność
- **Większość połączeń jest punktualna** - mediana 0.0 min
- **Transport kolejowy najbardziej punktualny** (pociągi, metro)
- **Autobusy mają największe problemy z punktualnością**

### 2. Różnice regionalne
- **Szczecin** wyróżnia się najlepszą punktualnością nawet przy dużej liczbie rekordów
- **Warszawa** ma największe wyzwania - średnia 1.76 min opóźnienia
- **Małe miasta** często mają doskonałą punktualność (ale mniej danych)

### 3. Specyfika danych
- **37.5% rekordów** nie ma danych o punktualności (prawdopodobnie połączenia całkowicie punktualne)
- **28% outlierów** - ekstremalne opóźnienia wymagają osobnej analizy
- **Duża asymetria** rozkładu - większość punktualna, ale istnieją znaczne opóźnienia

### 4. Typy transportu
- **Metro i trolejbusy** - najwyższa punktualność
- **Pociągi** - bardzo punktualne (prawdopodobnie głównie regionalne)
- **Tramwaje** - dobra punktualność miejska
- **Autobusy** - największa zmienność i problemy z punktualnością

## Ograniczenia analizy

### 1. Kompletność danych
- Tylko 62.5% rekordów ma dane o punktualności
- Brak danych może oznaczać perfect punktualność lub brak systemu monitoringu

### 2. Reprezentatywność
- Małe miasta mają niewiele danych do analizy
- Duże różnice w liczbie rekordów między regionami

### 3. Kontekst operacyjny
- Brak informacji o przyczynach opóźnień
- Nie uwzględnia warunków zewnętrznych (pogoda, korki)

## Znaczenie praktyczne

### Dla użytkowników:
- **Szczecin, małe miasta** - najwyższa przewidywalność rozkładów
- **Warszawa** - należy zakładać 2-4 min dodatkowego czasu
- **Transport szynowy** - najbardziej niezawodny

### Dla operatorów:
- **Autobusy** wymagają lepszego zarządzania ruchem
- **Duże miasta** potrzebują systemów priorytetów dla transportu publicznego
- **Monitoring punktualności** powinien być rozszerzony na wszystkie regiony

## Rekomendacje

1. **Rozszerzyć system monitoringu** na wszystkie regiony i typy transportu
2. **Analizować przyczyny outlierów** - ekstremalne opóźnienia
3. **Porównać z danymi o natężeniu ruchu** w różnych godzinach
4. **Rozwój systemów priorytetów** dla autobusów w dużych miastach
5. **Benchmarking** - uczyć się od najlepszych (Szczecin, transport szynowy)

## Metodologia zgodna z poprzednimi analizami

- **Filtry czasowe**: dni robocze, godziny 6:00-22:00
- **Metoda MAD**: identyfikacja outlierów (threshold=3.5)
- **Statystyki odporne**: mediana jako główny wskaźnik
- **Percentyle**: P90 jako miara ekstremów
- **Analiza kontekstowa**: według regionów i typów transportu

## Pliki wygenerowane

- `srednia_punktualnosc_v1.csv` - wyniki dla wszystkich regionów
- `analyze_punctuality.py` - skrypt analizy
- `README.md` - niniejsza dokumentacja metodyki 