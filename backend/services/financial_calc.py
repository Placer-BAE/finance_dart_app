from backend.models import FinancialYearData, MetricComparison


def calculate_metrics(curr: FinancialYearData, prev: FinancialYearData) -> MetricComparison:
    """
    매출 및 영업이익 YoY 증감 및 영업이익률 변동폭(%p) 계산
    단위: 억원
    """
    revenue_diff = curr.revenue - prev.revenue
    revenue_change_pct = ((curr.revenue - prev.revenue) / abs(prev.revenue) * 100) if prev.revenue != 0 else 0.0

    op_profit_diff = curr.operating_profit - prev.operating_profit
    
    # 적자/흑자 전환 여부 판별
    is_turnaround = prev.operating_profit < 0 and curr.operating_profit >= 0
    is_deficit = curr.operating_profit < 0

    if prev.operating_profit != 0:
        op_profit_change_pct = ((curr.operating_profit - prev.operating_profit) / abs(prev.operating_profit) * 100)
    else:
        op_profit_change_pct = 0.0

    curr_margin = curr.operating_margin
    prev_margin = prev.operating_margin
    op_margin_change_pp = curr_margin - prev_margin

    return MetricComparison(
        current_year=curr.year,
        previous_year=prev.year,
        current_revenue=curr.revenue,
        previous_revenue=prev.revenue,
        revenue_diff=revenue_diff,
        revenue_change_pct=round(revenue_change_pct, 2),
        current_op_profit=curr.operating_profit,
        previous_op_profit=prev.operating_profit,
        op_profit_diff=op_profit_diff,
        op_profit_change_pct=round(op_profit_change_pct, 2),
        current_op_margin=round(curr_margin, 2),
        previous_op_margin=round(prev_margin, 2),
        op_margin_change_pp=round(op_margin_change_pp, 2),
        is_turnaround=is_turnaround,
        is_deficit=is_deficit,
    )
