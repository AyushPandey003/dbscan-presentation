import plotly.graph_objects as go
import json

# Data from the provided JSON
data = {
    "datasets": ["Iris", "Wine", "Breast Cancer"], 
    "algorithms": ["DBSCAN", "OPTICS", "HDBSCAN"], 
    "silhouette_scores": {
        "Iris": {"DBSCAN": 0.65, "OPTICS": 0.72, "HDBSCAN": 0.78}, 
        "Wine": {"DBSCAN": 0.58, "OPTICS": 0.69, "HDBSCAN": 0.74}, 
        "Breast Cancer": {"DBSCAN": 0.52, "OPTICS": 0.61, "HDBSCAN": 0.67}
    }, 
    "error_bars": {
        "Iris": {"DBSCAN": 0.05, "OPTICS": 0.04, "HDBSCAN": 0.03}, 
        "Wine": {"DBSCAN": 0.06, "OPTICS": 0.05, "HDBSCAN": 0.04}, 
        "Breast Cancer": {"DBSCAN": 0.07, "OPTICS": 0.06, "HDBSCAN": 0.05}
    }
}

# Brand colors for the algorithms
colors = ['#1FB8CD', '#2E8B57', '#D2BA4C']  # Strong cyan, Sea green, Moderate yellow

# Create the figure
fig = go.Figure()

# Add bars for each algorithm
for i, algorithm in enumerate(data["algorithms"]):
    scores = [data["silhouette_scores"][dataset][algorithm] for dataset in data["datasets"]]
    errors = [data["error_bars"][dataset][algorithm] for dataset in data["datasets"]]
    
    fig.add_trace(go.Bar(
        name=algorithm,
        x=data["datasets"],
        y=scores,
        error_y=dict(
            type='data',
            array=errors,
            visible=True
        ),
        marker_color=colors[i],
        cliponaxis=False
    ))

# Update layout
fig.update_layout(
    title="Clustering Quality: Silhouette Scores",
    xaxis_title="Dataset",
    yaxis_title="Silhouette",
    barmode='group',
    yaxis=dict(range=[0, 1]),
    legend=dict(orientation='h', yanchor='bottom', y=1.05, xanchor='center', x=0.5)
)

# Save the chart
fig.write_image("clustering_silhouette_comparison.png")