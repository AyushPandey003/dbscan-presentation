import plotly.graph_objects as go
import plotly.io as pio

# Data from the provided JSON
metrics = ["Silhouette", "Davies-B (inv)", "Calinski-H", "Adj Rand Idx", "Norm Mut Info"]
values = [0.72, 0.68, 0.75, 0.81, 0.79]

# Close the polygon by repeating the first point
metrics_closed = metrics + [metrics[0]]
values_closed = values + [values[0]]

# Create the radar chart
fig = go.Figure()

fig.add_trace(go.Scatterpolar(
    r=values_closed,
    theta=metrics_closed,
    fill='toself',
    fillcolor='rgba(31, 184, 205, 0.3)',  # #1FB8CD with transparency
    line=dict(color='#1FB8CD', width=2),
    marker=dict(color='#1FB8CD', size=8),
    text=[f'{v:.2f}' for v in values_closed],
    textposition='middle center',
    textfont=dict(size=12),
    hovertemplate='<b>%{theta}</b><br>Value: %{r:.2f}<extra></extra>',
    cliponaxis=False
))

fig.update_layout(
    title='DBSCAN Multi-Metric Evaluation',
    polar=dict(
        radialaxis=dict(
            visible=True,
            range=[0, 1],
            showticklabels=True,
            tickfont=dict(size=10),
            gridcolor='rgba(128, 128, 128, 0.3)'
        ),
        angularaxis=dict(
            tickfont=dict(size=11),
            gridcolor='rgba(128, 128, 128, 0.3)'
        )
    ),
    showlegend=False
)

# Save the chart
fig.write_image('dbscan_radar_chart.png')