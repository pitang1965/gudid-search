# GUDID検索
# 概要
* 米国のFDA（食品医薬品局）の *openFDA* の[UDIのAPI](https://open.fda.gov/apis/device/udi/)を用いて、入力した企業のUDI(機器固有識別子)の一覧を取得します。
* APIは次のように使います。
`https://api.fda.gov/device/udi.json?search=company_name:%22Fuji%22&limit=100`
* 結果は、[TanStack Table](https://tanstack.com/table/v8)で表示します。
* [Edit on StackBlitz ⚡️](https://stackblitz.com/edit/vitejs-vite-r5sssm)
